import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

export default function MedicosAdmin() {
    const [medicos, setMedicos] = useState([]);
    const [search, setSearch] = useState("");
    const [sede, setSede] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        telefono: "",
        consultorio: "",
        especialidad: "",
        sedeId: "",
        foto: ""
    });
    const [sedes, setSedes] = useState([]);
    const [nuevoInfo, setNuevoInfo] = useState(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false); // Nuevo modal de horarios
    const [selectedDoctorId, setSelectedDoctorId] = useState(null); // ID del médico seleccionado
    const [schedule, setSchedule] = useState({}); // Horarios seleccionados

    // Fetch médicos
    useEffect(() => {
        fetchMedicos();
        fetchSedes();
    }, []);

    function fetchMedicos() {
        const token = localStorage.getItem("jwt");
        if (!token) {
            setError("Debes iniciar sesión como administrador.");
            setLoading(false);
            return;
        }
        fetch("http://localhost:8080/api/medicos/admin-list", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("No autorizado o error de servidor.");
                return res.json();
            })
            .then(data => {
                setMedicos(data);
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudieron cargar los médicos. ¿Tienes permisos?");
                setLoading(false);
            });
    }

    function fetchSedes() {
        fetch("http://localhost:8080/api/sedes")
            .then(res => res.json())
            .then(data => setSedes(data));
    }

    // Filtro
    let medicosFiltrados = medicos.filter(med =>
        (`${med.nombres} ${med.apellidos} ${med.especialidad}`.toLowerCase().includes(search.toLowerCase())) &&
        (sede === "" || med.sede === sede)
    );

    const sedesUnicas = Array.from(new Set(medicos.map(m => m.sede))).sort();

    // Manejador para archivo de foto
    const handleFotoChange = (e) => {
        if (e.target.files.length > 0) {
            setForm(f => ({ ...f, foto: e.target.files[0].name })); // Guardamos solo el nombre de la imagen
        }
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setNuevoInfo(null);

        const token = localStorage.getItem("jwt");
        if (!token) {
            alert("No autenticado.");
            return;
        }

        // Validar campos requeridos
        if (!form.nombres || !form.apellidos || !form.telefono || !form.consultorio || !form.especialidad || !form.sedeId) {
            alert("Completa todos los campos.");
            return;
        }

        let data = { ...form };

        fetch("http://localhost:8080/api/medicos/admin-nuevo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                setShowModal(false);
                setForm({
                    nombres: "",
                    apellidos: "",
                    telefono: "",
                    consultorio: "",
                    especialidad: "",
                    sedeId: "",
                    foto: ""
                });
                setNuevoInfo(result); // Mostrar usuario/contraseña/email generados
                fetchMedicos();
            })
            .catch(() => alert("Error al crear médico"));
    };

    // ...en tu componente
const eliminarMedico = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este médico? Esta acción no se puede deshacer.")) return;
    const token = localStorage.getItem("jwt");
    try {
        const res = await fetch(`http://localhost:8080/api/medicos/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(await res.text());
        alert("Médico eliminado correctamente.");
        fetchMedicos(); // Recarga la tabla
    } catch (err) {
        alert("Error al eliminar médico: " + err.message);
    }
};

    // Configurar horarios
    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        const selectedDays = [];
        const turno = []; // Turno seleccionado para cada día

        // Recolectar los días y turnos seleccionados
        document.querySelectorAll('.dayCheck').forEach((checkbox) => {
            if (checkbox.checked) {
                selectedDays.push(checkbox.value);
                turno.push(checkbox.checked ? "mañana" : "tarde");
            }
        });

        const nuevosHorarios = selectedDays.map((day, index) => ({
            medicoId: selectedDoctorId,
            diaSemana: day,
            turno: turno[index], // "mañana" o "tarde"
        }));

        fetch(`http://localhost:8080/api/horarios/configurar/${selectedDoctorId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevosHorarios),
        })
        .then(response => response.json())
        .then(data => {
            alert(data); // Mostrar mensaje de éxito
            setShowScheduleModal(false);
            fetchMedicos(); // Actualizar la lista de médicos
        })
        .catch((error) => {
            alert("Error al configurar los horarios");
        });
    };

    // Modal de configuración de horarios
    const openScheduleModal = (doctorId) => {
        setSelectedDoctorId(doctorId);
        setShowScheduleModal(true);
    };

    const closeScheduleModal = () => {
        setShowScheduleModal(false);
    };

    return (
        <div>
            <SidebarAdmin />
            <div className="container-medicos-admin">
                <h1>Administración de Doctores</h1>
                <div className="actions">
                    <button onClick={() => setShowModal(true)} style={{
                        background: "#1976d2", color: "#fff", border: "none",
                        padding: "0.5rem 1.2rem", borderRadius: 4, cursor: "pointer"
                    }}>+ Nuevo Doctor</button>
                    <input
                        type="text"
                        placeholder="Buscar doctor por nombre o especialidad"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select value={sede} onChange={e => setSede(e.target.value)}>
                        <option value="">Todas las sedes</option>
                        {sedesUnicas.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
                {loading
                    ? <div style={{ textAlign: "center", margin: "2rem 0" }}>Cargando...</div>
                    : error
                        ? <div style={{
                            color: "#c62828", background: "#ffebee", padding: 16,
                            borderRadius: 7, margin: "1.5rem 0", textAlign: "center"
                        }}>{error}</div>
                        : (
                            <table className="table-medicos-admin">
                                <thead>
                                    <tr>
                                        <th>ID Médico</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Teléfono</th>
                                        <th>Consultorio</th>
                                        <th>Especialidad</th>
                                        <th>Sede</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicosFiltrados.length === 0 ? (
                                        <tr>
                                            <td colSpan={9} style={{ textAlign: "center", fontStyle: "italic" }}>
                                                No se encontraron médicos para los filtros seleccionados.
                                            </td>
                                        </tr>
                                    ) : medicosFiltrados.map((med, idx) => (
                                        <tr key={med.id}>
                                            <td>{med.id}</td>
                                            <td>
                                                {med.foto
                                                    ? <img
                                                        src={`http://localhost:8080/img/${med.foto}`}  // Servimos la imagen desde el backend
                                                        alt="Foto"
                                                        style={{
                                                            width: 50, height: 50, borderRadius: "50%", objectFit: "cover"
                                                        }}
                                                        onError={e => e.target.src = require('../assets/img/doctor-default.png')}  // Imagen por defecto si hay error
                                                    />
                                                    : <div style={{
                                                        width: 50, height: 50, borderRadius: "50%",
                                                        background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", color: "#666"
                                                    }}>Sin foto</div>
                                                }
                                            </td>
                                            <td>{med.nombres}</td>
                                            <td>{med.apellidos}</td>
                                            <td>{med.telefono}</td>
                                            <td>{med.consultorio}</td>
                                            <td>{med.especialidad}</td>
                                            <td>{med.sede}</td>
                                            <td>
                                                <button className="btn btn-edit" disabled style={{
                                                    background: "#ffb300", color: "#fff", border: "none", padding: "4px 10px",
                                                    borderRadius: 4, marginRight: 6
                                                }}>Editar</button>
                                               <button
    className="btn btn-delete"
    style={{
        background: "#e53935", color: "#fff", border: "none", padding: "4px 10px",
        borderRadius: 4, marginRight: 6
    }}
    onClick={() => eliminarMedico(med.id)}
>
    Eliminar
</button>

                                                <button className="btn btn-schedule" onClick={() => openScheduleModal(med.id)} style={{
                                                    background: "#43a047", color: "#fff", border: "none", padding: "4px 10px",
                                                    borderRadius: 4
                                                }}>Configurar Horario</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                }
                {nuevoInfo && (
                    <div style={{
                        margin: "1rem 0", background: "#f3fbe9", border: "1px solid #8bc34a", borderRadius: 7, padding: "12px"
                    }}>
                        <b>¡Doctor registrado!</b><br />
                        <span>Usuario: <code>{nuevoInfo.usuario}</code></span><br />
                        <span>Contraseña: <code>{nuevoInfo.password}</code></span><br />
                        <span>Email: <code>{nuevoInfo.email}</code></span>
                    </div>
                )}
            </div>

            {/* MODAL NUEVO DOCTOR */}
            {showModal && (
                <div style={{
                    position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
                    background: "rgba(0,0,0,0.13)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <form style={{
                        background: "#fff", padding: 30, borderRadius: 14, minWidth: 340, maxWidth: "90vw",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.10)", display: "flex", flexDirection: "column", gap: 15
                    }} onSubmit={handleSubmit}>
                        <h2>Nuevo Doctor</h2>
                        <label>
                            Nombres:
                            <input type="text" value={form.nombres} onChange={e => setForm(f => ({ ...f, nombres: e.target.value }))} required />
                        </label>
                        <label>
                            Apellidos:
                            <input type="text" value={form.apellidos} onChange={e => setForm(f => ({ ...f, apellidos: e.target.value }))} required />
                        </label>
                        <label>
                            Teléfono:
                            <input type="text" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} required />
                        </label>
                        <label>
                            Consultorio:
                            <input type="text" value={form.consultorio} onChange={e => setForm(f => ({ ...f, consultorio: e.target.value }))} required />
                        </label>
                        <label>
                            Especialidad:
                            <select value={form.especialidad} onChange={e => setForm(f => ({ ...f, especialidad: e.target.value }))} required>
                                <option value="">Selecciona</option>
                                <option>Pediatría</option>
                                <option>Cardiología</option>
                                <option>Dermatología</option>
                                <option>Medicina Interna</option>
                                <option>Traumatología</option>
                                <option>Neurología</option>
                                <option>Oftalmología</option>
                                <option>Ginecología</option>
                            </select>
                        </label>
                        <label>
                            Sede:
                            <select value={form.sedeId} onChange={e => setForm(f => ({ ...f, sedeId: e.target.value }))} required>
                                <option value="">Selecciona</option>
                                {sedes.map(s => (
                                    <option key={s.id_sede} value={s.id_sede}>
                                        {s.nombre} ({s.region})
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Foto:
                            <input type="file" accept="image/*" onChange={handleFotoChange} />
                            {form.foto && <span style={{ marginLeft: 8 }}>{form.foto}</span>}
                        </label>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button type="button" onClick={() => setShowModal(false)}
                                style={{
                                    background: "#ccc", color: "#333", border: "none", borderRadius: 5, padding: "7px 16px"
                                }}>
                                Cancelar
                            </button>
                            <button type="submit" style={{
                                background: "#1976d2", color: "#fff", border: "none", borderRadius: 5, padding: "7px 16px"
                            }}>Guardar</button>
                        </div>
                    </form>
                </div>
            )}
            
            {/* MODAL CONFIGURAR HORARIO */}
            {showScheduleModal && (
                <div style={{
                    position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
                    background: "rgba(0,0,0,0.3)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{
                        background: "#fff", padding: 30, borderRadius: 14, minWidth: 340, maxWidth: "90vw",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.10)", display: "flex", flexDirection: "column", gap: 15
                    }}>
                        <h2>Configurar Horario</h2>
                        <form onSubmit={handleScheduleSubmit}>
                            <label>Días de la semana:</label>
                            <div>
                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                                    <label key={day}>
                                        <input type="checkbox" className="dayCheck" value={day} />
                                        {day}
                                    </label>
                                ))}
                            </div>
                            <div id="scheduleDaysContainer"></div>
                            <div id="hoursSelectedInfo"></div>
                            <div className="modal-actions">
                                <button type="submit" className="btn btn-edit">Guardar Horario</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
        .container-medicos-admin {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        .container-medicos-admin h1 { text-align: center; margin-bottom: 2rem; }
        .actions { margin-bottom: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;}
        .actions input, .actions select { padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc;}
        table.table-medicos-admin { width: 100%; border-collapse: collapse; margin-bottom: 1rem;}
        .table-medicos-admin th, .table-medicos-admin td { padding: 0.7rem; border-bottom: 1px solid #e0e0e0; text-align: left; vertical-align: middle;}
        .table-medicos-admin th { background: #f0f0f0;}
        .table-medicos-admin tr:hover { background: #f9f9f9;}
        .btn { padding: 0.3rem 0.8rem; border-radius: 3px; border: none; cursor: pointer;}
      `}</style>
        </div>
    );
}
