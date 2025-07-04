import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Obtiene sedes desde el backend
const fetchSedes = () =>
  fetch("http://localhost:8080/api/sedes")
    .then(res => res.json())
    .catch(() => []);

export default function Reclamos() {
  const [form, setForm] = useState({
    sedeId: "",
    dni: "",
    tipoReclamo: "",
    clasificacion: "",
    detalle: "",
  });

  const [sedes, setSedes] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSedes().then(data => setSedes(Array.isArray(data) ? data : []));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.sedeId) newErrors.sedeId = "Seleccione una sede";
    if (!form.dni) newErrors.dni = "Ingrese su DNI";
    if (!form.tipoReclamo) newErrors.tipoReclamo = "Seleccione tipo de reclamo";
    if (!form.clasificacion) newErrors.clasificacion = "Seleccione clasificación";
    if (!form.detalle) newErrors.detalle = "Ingrese detalle del reclamo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    // JWT para endpoint protegido
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Debes iniciar sesión para enviar un reclamo.");
      return;
    }

    // Construir el objeto para el backend
    const reclamo = {
      sede: { id_sede: form.sedeId },
      dni: form.dni,
      tipoReclamo: form.tipoReclamo,
      clasificacion: form.clasificacion,
      detalle: form.detalle,
    };

    try {
      const res = await fetch("http://localhost:8080/api/reclamos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(reclamo),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess("Reclamo enviado correctamente");
      setForm({
        sedeId: "",
        dni: "",
        tipoReclamo: "",
        clasificacion: "",
        detalle: "",
      });
      setErrors({});
    } catch (err) {
      alert("Error al enviar el reclamo: " + err.message);
    }
  };

  return (
    <>
      {/* Sidebar visual como en tu diseño */}
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
        body {
          font-family: 'Segoe UI', 'Arial', sans-serif;
          background: #f4f8fb;
          margin: 0;
          margin-left: 230px;
          color: #222;
        }
        .container-reclamo {
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
        .form-group {
          margin-bottom: 18px;
        }
        label {
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 6px;
          display: block;
        }
        input, select, textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
          background: #f9f9f9;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #1976d2;
          outline: none;
          background: #fff;
        }
        .error {
          color: red;
          font-size: 0.9rem;
          margin-top: 4px;
        }
        button {
          margin-top: 24px;
          padding: 12px 20px;
          background: linear-gradient(90deg, #1976d2, #42a5f5);
          border: none;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
        }
        button:hover {
          background: linear-gradient(90deg, #1565c0, #64b5f6);
        }
        @media (max-width: 700px) {
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
      `}</style>

      <div className="sidebar">
        <div className="sidebar-menu">
          <Link to="/reserva" className="sidebar-link">
            <i className="fa-solid fa-calendar-plus"></i>
            <span>Reservar Cita</span>
          </Link>
          <Link to="/citas" className="sidebar-link">
            <i className="fa-solid fa-calendar-check"></i>
            <span>Mis Citas</span>
          </Link>
          <Link to="/reclamos" className="sidebar-link active">
            <i className="fa-solid fa-book"></i>
            <span>Reclamaciones</span>
          </Link>
        </div>
      </div>

      <div className="container-reclamo">
        <h2 style={{ textAlign: "center" }}>
          Libro de Reclamaciones
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>
              Sede <span style={{ color: "red" }}>*</span>
            </label>
            <select name="sedeId" value={form.sedeId} onChange={handleChange}>
              <option value="">Seleccione una sede</option>
              {sedes.map((s) => (
                <option key={s.id_sede} value={s.id_sede}>
                  {s.nombre} ({s.region})
                </option>
              ))}
            </select>
            {errors.sedeId && <div className="error">{errors.sedeId}</div>}
          </div>

          <div className="form-group">
            <label>
              DNI <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              placeholder="Ingrese su DNI"
              maxLength={15}
            />
            {errors.dni && <div className="error">{errors.dni}</div>}
          </div>

          <div className="form-group">
            <label>
              Tipo de reclamo <span style={{ color: "red" }}>*</span>
            </label>
            <select name="tipoReclamo" value={form.tipoReclamo} onChange={handleChange}>
              <option value="">Seleccione tipo de reclamo</option>
              <option value="Reclamo">Reclamo</option>
              <option value="Queja">Queja</option>
            </select>
            {errors.tipoReclamo && <div className="error">{errors.tipoReclamo}</div>}
          </div>

          <div className="form-group">
            <label>
              Clasificación del bien <span style={{ color: "red" }}>*</span>
            </label>
            <select name="clasificacion" value={form.clasificacion} onChange={handleChange}>
              <option value="">Seleccione una opción</option>
              <option value="Producto">Producto</option>
              <option value="Servicio no relacionado a telecomunicaciones">
                Servicio no relacionado a telecomunicaciones
              </option>
              <option value="Servicio médico">Servicio médico</option>
            </select>
            {errors.clasificacion && <div className="error">{errors.clasificacion}</div>}
          </div>

          <div className="form-group">
            <label>
              Detalle del reclamo <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="detalle"
              value={form.detalle}
              onChange={handleChange}
              rows="5"
              placeholder="Describa su reclamo aquí..."
            />
            {errors.detalle && <div className="error">{errors.detalle}</div>}
          </div>

          <button type="submit">Enviar Reclamo</button>
          {success && <div style={{ color: "green", fontSize: 16, marginTop: 16 }}>{success}</div>}
        </form>
      </div>
    </>
  );
}
