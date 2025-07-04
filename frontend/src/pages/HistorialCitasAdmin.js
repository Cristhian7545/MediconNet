import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

function HistorialCitasAdmin() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [sedeFiltro, setSedeFiltro] = useState("");
  const [medicoFiltro, setMedicoFiltro] = useState("");
  const [pacienteFiltro, setPacienteFiltro] = useState("");
  const [especialidadFiltro, setEspecialidadFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  // Obtener citas del backend
  useEffect(() => {
    fetch("http://localhost:8080/api/citas/historial", {
      headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error cargando citas");
        return res.json();
      })
      .then(data => {
        setCitas(data);
        setLoading(false);
      })
      .catch(() => {
        alert("No se pudieron cargar las citas.");
        setLoading(false);
      });
  }, []);

  // Opciones únicas para selectores
  const sedes = [...new Set(citas.map(c => c.medico.sede || ""))].filter(Boolean).sort();
  const medicos = [...new Set(citas.map(c => `${c.medico.nombres} ${c.medico.apellidos}`))].filter(Boolean).sort();
  const especialidades = [...new Set(citas.map(c => c.medico.especialidad || ""))].filter(Boolean).sort();
  const estados = [...new Set(citas.map(c => c.estado || ""))].filter(Boolean).sort();

  // Lógica de filtrado
  const citasFiltradas = citas.filter(cita => {
    const fecha = cita.fechaHora ? cita.fechaHora.slice(0, 10) : "";
    const nombreMedico = `${cita.medico.nombres} ${cita.medico.apellidos}`;
    const nombrePaciente = `${cita.paciente.nombres} ${cita.paciente.apellidos}`.toLowerCase();

    return (
      (!fechaFiltro || fecha === fechaFiltro) &&
      (!sedeFiltro || cita.medico.sede === sedeFiltro) &&
      (!medicoFiltro || nombreMedico === medicoFiltro) &&
      (!pacienteFiltro || nombrePaciente.includes(pacienteFiltro.toLowerCase())) &&
      (!especialidadFiltro || cita.medico.especialidad === especialidadFiltro) &&
      (!estadoFiltro || cita.estado === estadoFiltro)
    );
  });

  // Cancelar cita
  const cancelarCita = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta cita?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/citas/cancelar/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` }
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Cita cancelada.");
      setCitas(citas => citas.map(c => c.id === id ? { ...c, estado: "Cancelada" } : c));
    } catch (err) {
      alert("No se pudo cancelar: " + err.message);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <SidebarAdmin />
      <main style={{ marginLeft: 240, padding: "2rem" }}>
        <h1>Historial de Citas</h1>

        <div className="filters" style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem"
        }}>
          <div>
            <label>Fecha: </label>
            <input type="date" value={fechaFiltro} onChange={e => setFechaFiltro(e.target.value)} />
          </div>
          <div>
            <label>Sede: </label>
            <select value={sedeFiltro} onChange={e => setSedeFiltro(e.target.value)}>
              <option value="">Todas</option>
              {sedes.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label>Médico: </label>
            <select value={medicoFiltro} onChange={e => setMedicoFiltro(e.target.value)}>
              <option value="">Todos</option>
              {medicos.map((m, i) => <option key={i} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label>Paciente: </label>
            <input type="text" placeholder="Nombre o apellido" value={pacienteFiltro}
              onChange={e => setPacienteFiltro(e.target.value)} />
          </div>
          <div>
            <label>Especialidad: </label>
            <select value={especialidadFiltro} onChange={e => setEspecialidadFiltro(e.target.value)}>
              <option value="">Todas</option>
              {especialidades.map((esp, i) => <option key={i} value={esp}>{esp}</option>)}
            </select>
          </div>
          <div>
            <label>Estado: </label>
            <select value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}>
              <option value="">Todos</option>
              {estados.map((e, i) => <option key={i} value={e}>{e}</option>)}
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Especialidad</th>
              <th>Sede</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", fontStyle: "italic" }}>
                  No se encontraron citas con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              citasFiltradas.map((cita, i) => (
                <tr key={i}>
                  <td>{cita.fechaHora ? new Date(cita.fechaHora).toLocaleString() : ""}</td>
                  <td>{cita.paciente.nombres} {cita.paciente.apellidos}</td>
                  <td>{cita.medico.nombres} {cita.medico.apellidos}</td>
                  <td>{cita.medico.especialidad}</td>
                  <td>{cita.medico.sede}</td>
                  <td>{cita.motivo}</td>
                  <td>{cita.estado}</td>
                  <td>
                    {cita.estado !== "Confirmada" && (
                      <button
                        className="cancel-btn"
                        style={{
                          padding: "6px 12px", backgroundColor: "#e53935", color: "#fff", border: "none", borderRadius: 4, fontWeight: "bold"
                        }}
                        onClick={() => cancelarCita(cita.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 2rem;
          background-color: #f5f8fa;
        }
        h1 {
          text-align: center;
          color: #1976d2;
          margin-bottom: 1.5rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
          border-radius: 8px;
          overflow: hidden;
        }
        thead {
          background-color: #1976d2;
          color: white;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
          vertical-align: middle;
        }
        tbody tr:hover {
          background-color: #e3f2fd;
        }
        .cancel-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          table {
            font-size: 0.9rem;
          }
        }
        main {
          margin-left: 240px;
          padding: 2rem;
        }
        .filters {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .filters label {
          font-weight: bold;
          margin-right: 0.5rem;
        }
        .filters input,
        .filters select {
          padding: 0.4rem 0.6rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

export default HistorialCitasAdmin;
