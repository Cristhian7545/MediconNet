import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

// Configuración de los días y horarios
const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const horariosDetalle = [
  { tipo: "Mañana", hora: "06:00 – 08:00" },
  { tipo: "", hora: "08:00 – 10:00" },
  { tipo: "", hora: "10:00 – 12:00" },
  { tipo: "Break", hora: "12:00 – 13:00" },
  { tipo: "Tarde", hora: "13:00 – 15:00" },
  { tipo: "", hora: "15:00 – 17:00" },
  { tipo: "", hora: "17:00 – 19:00" }
];
const turnoIntervalos = {
  "mañana": ["06:00 – 08:00", "08:00 – 10:00", "10:00 – 12:00"],
  "tarde": ["13:00 – 15:00", "15:00 – 17:00", "17:00 – 19:00"]
};

// Genera un color pastel determinístico para cada nombre
function colorPastelAleatorio(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 85%)`;
}

export default function HorariosDoctoresSemana() {
  const [doctores, setDoctores] = useState([]);
  const [especialidad, setEspecialidad] = useState("");
  const [sede, setSede] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // JWT del localStorage, obligatorio para el fetch
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("No tienes sesión iniciada. Por favor, inicia sesión para ver los horarios.");
      return;
    }
    fetch("http://localhost:8080/api/horarios/doctor-view", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(r => {
        if (!r.ok) throw new Error("No autorizado o error de servidor.");
        return r.json();
      })
      .then(setDoctores)
      .catch(() => setError("No se pudieron cargar los horarios. Verifica tu sesión o permisos."));
  }, []);

  // Filtros únicos
  const especialidades = Array.from(new Set(doctores.map(d => d.especialidad))).sort();
  const sedes = Array.from(new Set(doctores.map(d => d.sede))).sort();

  // Filtros aplicados
  let doctoresFiltrados = doctores;
  if (especialidad) doctoresFiltrados = doctoresFiltrados.filter(d => d.especialidad === especialidad);
  if (sede) doctoresFiltrados = doctoresFiltrados.filter(d => d.sede === sede);

  // Agrupa doctores por especialidad+sede
  const grupos = {};
  doctoresFiltrados.forEach(doc => {
    const key = `${doc.especialidad}||${doc.sede}`;
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(doc);
  });

  return (
    <div style={{ marginLeft: 240, padding: "2rem" }}>
      <SidebarAdmin />
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Horarios de Doctores Semana Actual</h1>
      <div style={{
        marginBottom: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap"
      }}>
        <select value={especialidad} onChange={e => setEspecialidad(e.target.value)}>
          <option value="">Todas las especialidades</option>
          {especialidades.map(esp => <option key={esp}>{esp}</option>)}
        </select>
        <select value={sede} onChange={e => setSede(e.target.value)}>
          <option value="">Todas las sedes</option>
          {sedes.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      {error && <div style={{
        background: "#fdecea", color: "#b71c1c", border: "1px solid #e57373", padding: "14px",
        textAlign: "center", borderRadius: "7px", margin: "18px auto", maxWidth: 450, fontWeight: 600
      }}>{error}</div>}
      {Object.keys(grupos).length === 0 && !error
        ? <p style={{ textAlign: "center", fontStyle: "italic" }}>No hay horarios para los filtros seleccionados.</p>
        : Object.entries(grupos).map(([key, docsGrupo]) => {
          const [esp, sede_] = key.split("||");
          const coloresDoctores = {};
          return (
            <section key={key} style={{
              marginBottom: "2rem", background: "#fff", padding: "1rem 1.5rem",
              borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
            }}>
              <h2 style={{ marginTop: 0, color: "#1976d2" }}>
                Horarios: {esp} - Sede {sede_}
              </h2>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
                <thead>
                  <tr>
                    <th>Horario</th>
                    <th>Hora</th>
                    {diasSemana.map(dia => <th key={dia}>{dia}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {horariosDetalle.map(({ tipo, hora }, i) => {
                    if (tipo === "Break") {
                      return <tr className="break-row" key={i}><td colSpan={9}>Break ({hora})</td></tr>;
                    }
                    return (
                      <tr key={i}>
                        <td>{tipo}</td>
                        <td>{hora}</td>
                        {diasSemana.map(dia => {
                          let celda = "";
                          if (docsGrupo.length > 0 && tipo !== "") {
                            // médicos en turno (por día, tipo, hora)
                            const docsEnTurno = docsGrupo.filter(doc => {
                              const turnosDia = (doc.horario[dia] || []);
                              return turnosDia.some(turno => turnoIntervalos[turno?.toLowerCase()]?.includes(hora));
                            });
                            if (docsEnTurno.length > 0) {
                              celda = docsEnTurno.map(d => {
                                if (!coloresDoctores[d.nombre]) coloresDoctores[d.nombre] = colorPastelAleatorio(d.nombre);
                                return <span className="doctor-name" key={d.nombre} style={{
                                  display: "block", padding: "2px 6px", borderRadius: 4, margin: "2px 0",
                                  fontSize: "0.85rem", backgroundColor: coloresDoctores[d.nombre], color: "#333"
                                }}>{d.nombre}</span>;
                              });
                            }
                          } else if (docsGrupo.length > 0 && tipo === "") {
                            // intervalo sin etiqueta, checa si corresponde a mañana o tarde
                            let turnoActual = null;
                            if (turnoIntervalos["mañana"].includes(hora)) turnoActual = "mañana";
                            else if (turnoIntervalos["tarde"].includes(hora)) turnoActual = "tarde";
                            if (turnoActual) {
                              const docsEnTurno = docsGrupo.filter(doc => {
                                const turnosDia = (doc.horario[dia] || []);
                                return turnosDia.map(t => t?.toLowerCase()).includes(turnoActual);
                              });
                              if (docsEnTurno.length > 0) {
                                celda = docsEnTurno.map(d => {
                                  if (!coloresDoctores[d.nombre]) coloresDoctores[d.nombre] = colorPastelAleatorio(d.nombre);
                                  return <span className="doctor-name" key={d.nombre} style={{
                                    display: "block", padding: "2px 6px", borderRadius: 4, margin: "2px 0",
                                    fontSize: "0.85rem", backgroundColor: coloresDoctores[d.nombre], color: "#333"
                                  }}>{d.nombre}</span>;
                                });
                              }
                            }
                          }
                          return <td key={dia}>{celda}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          );
        })}
    </div>
  );
}
