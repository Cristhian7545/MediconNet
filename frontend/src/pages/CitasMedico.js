import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function CitasMedico() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Traer citas del backend
    const fetchCitas = () => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        fetch("http://localhost:8080/api/citas/medico-citas", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("No autorizado o error");
                return res.json();
            })
            .then(data => {
                setCitas(data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                alert("Error al cargar tus citas. ¿Estás logueado?");
            });
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    // Función para cancelar cita
    const cancelarCita = async (id) => {
        if (!window.confirm("¿Seguro que deseas cancelar esta cita?")) return;
        const token = localStorage.getItem("jwt");
        try {
            const res = await fetch(`http://localhost:8080/api/citas/cancelar/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || "No se pudo cancelar");
            }
            alert("Cita cancelada correctamente.");
            fetchCitas();
        } catch (err) {
            alert("Error al cancelar: " + err.message);
        }
    };

    // ----------- FUNCIÓN CONFIRMAR --------------
    const confirmarCita = async (id) => {
        if (!window.confirm("¿Deseas confirmar esta cita?")) return;
        const token = localStorage.getItem("jwt");
        try {
            const res = await fetch(`http://localhost:8080/api/citas/confirmar/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || "No se pudo confirmar");
            }
            alert("Cita confirmada correctamente.");
            fetchCitas();
        } catch (err) {
            alert("Error al confirmar: " + err.message);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="cita-container">
            <style>
                {`
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
          justify-content: flex-start;
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
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f8fa;
        }
        main {
          margin-left: 19%;
          margin-right: 5%;
          padding: 40px 20px;
        }
        h1 {
          margin-bottom: 26px;
          color: #1976d2;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
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
        }
        tbody tr:nth-child(even) {
          background-color: #f0f4f8;
        }
        tbody tr:hover {
          background-color: #e3f2fd;
        }
        .btn-cancelar {
          background-color: #e53935;
          color: #fff;
          border: none;
          padding: 7px 18px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
          margin-right: 6px;
        }
        .btn-cancelar:hover {
          background-color: #b71c1c;
        }
        .btn-confirmar {
          background-color: #43a047;
          color: #fff;
          border: none;
          padding: 7px 18px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
        }
        .btn-confirmar:hover {
          background-color: #1b5e20;
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            flex-direction: row;
            position: relative;
          }
          main {
            margin-left: 0;
            padding: 20px;
          }
          table {
            font-size: 0.9rem;
          }
        }
        `}
            </style>

            {/* --- SIDEBAR --- */}
            <div className="sidebar">
                <div className="sidebar-menu">
                    <Link to="/perfil-medico" className="sidebar-link" title="Perfil Médico">
                        <i className="fa-solid fa-user-md"></i>
                        <span>Perfil Médico</span>
                    </Link>
                    <Link to="/citas-medico" className="sidebar-link active" title="Citas Pendientes">
                        <i className="fa-solid fa-calendar-check"></i>
                        <span>Citas Pendientes</span>
                    </Link>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <main>
                <h1>Listado de Citas</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Paciente</th>
                            <th>Médico</th>
                            <th>Especialidad</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((detalle, i) => (
                            <tr key={i}>
                                <td>{new Date(detalle.cita.fechaHora).toLocaleString()}</td>
                                <td>{`${detalle.paciente.nombres} ${detalle.paciente.apellidos}`}</td>
                                <td>{`${detalle.medico.nombres} ${detalle.medico.apellidos}`}</td>
                                <td>{detalle.medico.especialidad}</td>
                                <td>{detalle.cita.motivo}</td>
                                <td>{detalle.cita.estado}</td>
                                <td>
                                    {/* Solo mostrar el botón si la cita no está confirmada */}
                                    {detalle.cita.estado !== "Confirmada" && (
                                        <button
                                            className="btn-confirmar"
                                            onClick={() => confirmarCita(detalle.cita.id)}
                                        >
                                            Confirmar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default CitasMedico;
