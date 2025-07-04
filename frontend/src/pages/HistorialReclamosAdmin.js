import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

function HistorialReclamosAdmin() {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [filtros, setFiltros] = useState({
    sede: "",
    idPaciente: "",
    nombre: "",
    apellido: "",
    dni: "",
    clasificacion: ""
  });

  // Para el select de sede y clasificación
  const [sedes, setSedes] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reclamos", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error cargando reclamos");
        return res.json();
      })
      .then(data => {
        setReclamos(data);

        // Para select de sedes y clasificaciones únicas:
        const sedesUnicas = [...new Set(data.map(r => r.sede))].filter(Boolean);
        setSedes(sedesUnicas);
        const clasifUnicas = [...new Set(data.map(r => r.clasificacion))].filter(Boolean);
        setClasificaciones(clasifUnicas);
        setLoading(false);
      })
      .catch(() => {
        alert("No se pudieron cargar los reclamos.");
        setLoading(false);
      });
  }, []);

  // Manejar los cambios de los filtros
  const handleFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  // Filtrado dinámico
  const reclamosFiltrados = reclamos.filter(r => {
    // Filtro de sede
    if (filtros.sede && r.sede !== filtros.sede) return false;
    // Filtro de id paciente
    if (filtros.idPaciente && String(r.id_paciente) !== filtros.idPaciente) return false;
    // Filtro de nombre
    if (filtros.nombre && !(r.nombres_paciente?.toLowerCase().includes(filtros.nombre.toLowerCase()))) return false;
    // Filtro de apellido
    if (filtros.apellido && !(r.apellidos_paciente?.toLowerCase().includes(filtros.apellido.toLowerCase()))) return false;
    // Filtro de DNI
    if (filtros.dni && !(r.dni?.toLowerCase().includes(filtros.dni.toLowerCase()))) return false;
    // Filtro de clasificación
    if (filtros.clasificacion && r.clasificacion !== filtros.clasificacion) return false;
    return true;
  });

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <SidebarAdmin />
      <main style={{ marginLeft: 260, padding: "2rem" }}>
        <h1>Listado de Reclamos</h1>

        {/* Filtros */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: 28 }}>
          <div>
            <label><b>Sede:</b></label><br />
            <select name="sede" value={filtros.sede} onChange={handleFiltro}>
              <option value="">Todas</option>
              {sedes.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label><b>ID Paciente:</b></label><br />
            <input
              type="text"
              name="idPaciente"
              value={filtros.idPaciente}
              onChange={handleFiltro}
              placeholder="ID paciente"
              style={{ width: 120 }}
            />
          </div>
          <div>
            <label><b>Nombre:</b></label><br />
            <input
              type="text"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFiltro}
              placeholder="Nombre"
              style={{ width: 120 }}
            />
          </div>
          <div>
            <label><b>Apellido:</b></label><br />
            <input
              type="text"
              name="apellido"
              value={filtros.apellido}
              onChange={handleFiltro}
              placeholder="Apellido"
              style={{ width: 120 }}
            />
          </div>
          <div>
            <label><b>DNI:</b></label><br />
            <input
              type="text"
              name="dni"
              value={filtros.dni}
              onChange={handleFiltro}
              placeholder="DNI"
              style={{ width: 120 }}
            />
          </div>
          <div>
            <label><b>Clasificación:</b></label><br />
            <select name="clasificacion" value={filtros.clasificacion} onChange={handleFiltro}>
              <option value="">Todas</option>
              {clasificaciones.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sede</th>
              <th>ID Paciente</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>DNI</th>
              <th>Tipo de Reclamo</th>
              <th>Clasificación</th>
              <th>Detalle</th>
              <th>Fecha de Reclamo</th>
            </tr>
          </thead>
          <tbody>
            {reclamosFiltrados.length === 0
              ? <tr><td colSpan={10} style={{ textAlign: "center", fontStyle: "italic" }}>No hay resultados</td></tr>
              : reclamosFiltrados.map((r, i) => (
                  <tr key={i}>
                    <td>{r.id_reclamo}</td>
                    <td>{r.sede}</td>
                    <td>{r.id_paciente}</td>
                    <td>{r.nombres_paciente}</td>
                    <td>{r.apellidos_paciente}</td>
                    <td>{r.dni}</td>
                    <td>{r.tipoReclamo}</td>
                    <td>{r.clasificacion}</td>
                    <td>{r.detalle}</td>
                    <td>{r.fechaReclamo?.replace("T", " ").substring(0, 16)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </main>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 2rem;
          background-color: #f9f9f9;
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
        }
        tbody tr:hover {
          background-color: #e3f2fd;
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
      `}</style>
    </div>
  );
}

export default HistorialReclamosAdmin;
