import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Utiliza la URL base de tu backend
const BACKEND = "http://localhost:8080/api";

const diasSemana = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Miercoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
  Sabado: 6,
};

export default function Reserva() {
  // Estados para los selects y form
  const [sedes, setSedes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [dias, setDias] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const [form, setForm] = useState({
    sedeId: "",
    especialidad: "",
    medicoId: "",
    dia: "",
    turno: "",
    fecha: "",
    hora: "",
    motivo: "",
  });

  const navigate = useNavigate();

  // Fecha mínima (mañana)
  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 1);
  const minDate = hoy.toISOString().split("T")[0];

  // Protección: solo logueado
  useEffect(() => {
    if (!localStorage.getItem("jwt")) navigate("/login");
  }, [navigate]);

  // Cargar sedes al montar
  useEffect(() => {
    fetch(`${BACKEND}/sedes`)
      .then(res => res.json())
      .then(data => setSedes(Array.isArray(data) ? data : []));
  }, []);

  // Cargar especialidades al cambiar sede
  useEffect(() => {
    if (!form.sedeId) {
      setEspecialidades([]);
      return;
    }
    fetch(`${BACKEND}/medicos/especialidades?sedeId=${form.sedeId}`)
      .then(res => res.json())
      .then(data => setEspecialidades(Array.isArray(data) ? data : []));
  }, [form.sedeId]);

  // Cargar médicos al cambiar sede o especialidad
  useEffect(() => {
    if (!form.sedeId || !form.especialidad) {
      setMedicos([]);
      return;
    }
    fetch(`${BACKEND}/medicos/por-sede-y-especialidad?sedeId=${form.sedeId}&especialidad=${form.especialidad}`)
      .then(res => res.json())
      .then(data => setMedicos(Array.isArray(data) ? data : []));
  }, [form.sedeId, form.especialidad]);

  // Cargar días al cambiar médico
  useEffect(() => {
    if (!form.medicoId) {
      setDias([]);
      return;
    }
    fetch(`${BACKEND}/horarios/dias?medicoId=${form.medicoId}`)
      .then(res => res.json())
      .then(data => setDias(Array.isArray(data) ? data : []));
  }, [form.medicoId]);

  // Cargar turnos al cambiar día
  useEffect(() => {
    if (!form.medicoId || !form.dia) {
      setTurnos([]);
      return;
    }
    fetch(`${BACKEND}/horarios/turnos?medicoId=${form.medicoId}&dia=${form.dia}`)
      .then(res => res.json())
      .then(data => setTurnos(Array.isArray(data) ? data : []));
  }, [form.medicoId, form.dia]);

  // Cargar horarios disponibles al cambiar turno o fecha
  useEffect(() => {
    const { medicoId, dia, turno, fecha } = form;
    if (!medicoId || !dia || !turno || !fecha) {
      setHorasDisponibles([]);
      return;
    }

    // Validación fecha
    const fechaDate = new Date(fecha + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diaFecha = fechaDate.getDay();
    if (
      fechaDate <= today ||
      diaFecha === 0 ||
      diasSemana[dia] === undefined ||
      diaFecha !== diasSemana[dia]
    ) {
      setHorasDisponibles([]);
      return;
    }

    fetch(`${BACKEND}/horarios/disponibles?medicoId=${medicoId}&dia=${dia}&turno=${turno}&fecha=${fecha}`)
      .then(res => res.json())
      .then(data => setHorasDisponibles(Array.isArray(data) ? data : []));
  }, [form.medicoId, form.dia, form.turno, form.fecha]);

  // Handlers
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      ...(e.target.name === "sedeId" && {
        especialidad: "", medicoId: "", dia: "", turno: "", fecha: "", hora: ""
      }),
    });
  };

  // Handler especial solo para fecha
  const handleFechaChange = e => {
    const valor = e.target.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(valor + "T00:00:00");
    const diaDeFecha = fechaSeleccionada.getDay();
    const diaDeLaSemanaDeseado = diasSemana[form.dia];

    if (!form.dia) {
      alert("Primero selecciona el día de la semana.");
      setForm(f => ({ ...f, fecha: "" }));
      return;
    }
    if (fechaSeleccionada <= today) {
      alert("La fecha debe ser posterior al día actual.");
      setForm(f => ({ ...f, fecha: "" }));
      return;
    }
    if (diaDeFecha !== diaDeLaSemanaDeseado) {
      alert(`La fecha debe coincidir con un ${form.dia}.`);
      setForm(f => ({ ...f, fecha: "" }));
      return;
    }
    setForm(f => ({ ...f, fecha: valor }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar todos los campos
    const { sedeId, medicoId, fecha, hora, motivo } = form;
    if (!sedeId || !medicoId || !fecha || !hora || !motivo) {
      alert("Completa todos los campos antes de reservar");
      return;
    }

    const fechaHora = `${fecha}T${hora}`;
    const body = {
      sedeId,
      medicoId,
      fechaHora,
      motivo
    };

    const token = localStorage.getItem("jwt");

    const res = await fetch(`${BACKEND}/citas/reservar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      alert("✅ ¡Cita reservada correctamente!");
      navigate("/citas");
    } else {
      const err = await res.text();
      alert("❌ Error al reservar: " + err);
    }
  };

  return (
    <>
      {/* Estilos CSS del diseño nuevo */}
      <style>{`
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 230px;
            height: 100vh;
            background: linear-gradient(180deg, #1976d2 80%, #1565c0 100%);
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            z-index: 100;
            box-shadow: 2px 0 10px rgba(25, 118, 210, 0.10);
        }
        .sidebar-menu {
            display: flex;
            flex-direction: column;
            margin-top: 40px;
        }
        .sidebar-link {
            display: flex;
            align-items: center;
            padding: 16px 24px;
            color: #fff;
            text-decoration: none;
            font-size: 1.08rem;
            transition: background 0.15s;
            border-left: 4px solid transparent;
        }
        .sidebar-link i {
            margin-right: 14px;
            font-size: 1.25em;
        }
        .sidebar-link.active, .sidebar-link:hover {
            background: rgba(255,255,255,0.10);
            border-left: 4px solid #fff;
            font-weight: 600;
        }
        .sidebar-profile {
            display: flex;
            align-items: center;
            padding: 20px 24px;
            border-top: 1px solid rgba(255,255,255,0.15);
            font-size: 1.1rem;
            background: rgba(21,101,192,0.92);
        }
        .sidebar-profile i {
            font-size: 1.5em;
            margin-right: 12px;
        }

        .container-reserva {
            max-width: 900px;
            margin: 55px auto 0 auto;
            padding: 32px 38px 28px 38px;
            background: #fff;
            border-radius: 14px;
            box-shadow: 0 4px 32px rgba(25,118,210,0.08);
        }
        h2 {
            margin-bottom: 26px;
            color: #1976d2;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        .form-row {
            display: grid;
            grid-gap: 18px;
            margin-bottom: 12px;
        }
        .row-2 {
            grid-template-columns: 1fr 1fr;
        }
        .form-group {
            display: flex;
            flex-direction: column;
        }
        label {
            margin-bottom: 5px;
            font-size: 1.07rem;
            font-weight: 500;
            color: #1976d2;
        }
        input[type="text"], input[type="date"], select, textarea {
            padding: 10px 12px;
            border-radius: 6px;
            border: 1.5px solid #d0d7e1;
            background-color: #f9fbfd;
            font-size: 1rem;
            margin-bottom: 2px;
            box-shadow: 0 1px 3px rgba(25, 118, 210, 0.07);
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        input[type="text"]:focus, input[type="date"]:focus, select:focus, textarea:focus {
            border-color: #1976d2;
            outline: none;
            box-shadow: 0 2px 8px rgba(25, 118, 210, 0.12);
        }
        button {
            margin-top: 32px;
            padding: 12px 20px;
            border-radius: 6px;
            border: none;
            background: linear-gradient(90deg, #1976d2 70%, #42a5f5 100%);
            color: #fff;
            font-size: 1.13rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(25,118,210,0.10);
            transition: background 0.2s, box-shadow 0.2s;
        }
        button:hover {
            background: linear-gradient(90deg, #1565c0 60%, #64b5f6 100%);
            box-shadow: 0 4px 16px rgba(25,118,210,0.13);
        }

        @media (max-width: 900px) {
            .sidebar {
                width: 60px;
            }
            .sidebar-link span, .sidebar-profile span {
                display: none;
            }
            .sidebar-link, .sidebar-profile {
                justify-content: center;
                padding: 18px 0;
            }
            body {
                margin-left: 60px;
            }
        }
        @media (max-width: 700px) {
            .container {
                max-width: 98vw;
                padding: 12vw 4vw 8vw 4vw;
                margin-top: 24px;
            }
            h2 {
                font-size: 1.3rem;
            }
            .row-2 {
                grid-template-columns: 1fr;
            }
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-menu">
          <a href="/reserva" className="sidebar-link active" title="Reservar una cita">
            <i className="fa-solid fa-calendar-plus"></i>
            <span>Reservar Cita</span>
          </a>
          <a href="/citas" className="sidebar-link" title="Ver mis citas">
            <i className="fa-solid fa-calendar-check"></i>
            <span>Mis Citas</span>
          </a>
          <a href="/reclamos" className="sidebar-link" title="Libro de reclamaciones">
            <i className="fa-solid fa-book"></i>
            <span>Reclamaciones</span>
          </a>
        </div>
      </div>

      {/* Contenedor principal */}
      <main className="container-reserva">
        <h2>Reserva tu turno</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-row row-2">
            <div className="form-group">
              <label htmlFor="sedeId">Sede</label>
              <select
                id="sedeId"
                name="sedeId"
                value={form.sedeId}
                onChange={handleChange}
                required
              >
                <option value="">--Seleccione Sede--</option>
                {sedes.map(sede => (
                  <option key={sede.id_sede} value={sede.id_sede}>
                    {sede.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="especialidad">Especialidad</label>
              <select
                id="especialidad"
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
                required
                disabled={!form.sedeId}
              >
                <option value="">--Seleccione Especialidad--</option>
                {especialidades.map(especialidad => (
                  <option key={especialidad} value={especialidad}>
                    {especialidad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row row-2">
            <div className="form-group">
              <label htmlFor="medicoId">Médico</label>
              <select
                id="medicoId"
                name="medicoId"
                value={form.medicoId}
                onChange={handleChange}
                required
                disabled={!form.especialidad}
              >
                <option value="">--Seleccione Médico--</option>
                {medicos.map(medico => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nombres} {medico.apellidos}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dia">Día</label>
              <select
                id="dia"
                name="dia"
                value={form.dia}
                onChange={handleChange}
                required
                disabled={!form.medicoId}
              >
                <option value="">--Seleccione Día--</option>
                {dias.map(dia => (
                  <option key={dia} value={dia}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row row-2">
            <div className="form-group">
              <label htmlFor="turno">Turno</label>
              <select
                id="turno"
                name="turno"
                value={form.turno}
                onChange={handleChange}
                required
                disabled={!form.dia}
              >
                <option value="">--Seleccione Turno--</option>
                {turnos.map(turno => (
                  <option key={turno} value={turno}>
                    {turno}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={form.fecha}
                onChange={handleFechaChange}
                required
                min={minDate}
                disabled={!form.turno}
              />
            </div>
          </div>

          <div className="form-row row-2">
            <div className="form-group">
              <label htmlFor="hora">Hora Disponible</label>
              <select
                id="hora"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                required
                disabled={!form.fecha || horasDisponibles.length === 0}
              >
                <option value="">--Seleccione Hora--</option>
                {horasDisponibles.length === 0
                  ? <option disabled>No hay horarios disponibles</option>
                  : horasDisponibles.map(hora => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="motivo">Motivo</label>
              <textarea
                id="motivo"
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                placeholder="Ingrese motivo de la reserva"
                required
                rows={2}
              />
            </div>
          </div>
          <button type="submit">Reservar cita</button>
        </form>
      </main>
    </>
  );
}
