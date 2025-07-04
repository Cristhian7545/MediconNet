import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

function PacientesAdmin() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("jwt");
  fetch("http://localhost:8080/api/pacientes", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Error cargando pacientes");
      return res.json();
    })
    .then(data => {
      setPacientes(data);
      setLoading(false);
    })
    .catch(() => {
      alert("No se pudieron cargar los pacientes.");
      setLoading(false);
    });
}, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <SidebarAdmin />
      <main style={{ marginLeft: 240, padding: "2rem" }}>
        <h1>Lista de Pacientes</h1>

        {/* Aquí puedes poner los filtros luego */}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Username</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Fecha de Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, i) => (
              <tr key={i}>
                <td>{p.id_paciente}</td>
                <td>{p.nombres}</td>
                <td>{p.apellidos}</td>
                <td>{p.username}</td>
                <td>{p.email}</td>
                <td>{p.telefono}</td>
                <td>{p.direccion}</td>
                <td>{p.fechaNacimiento}</td>
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

export default PacientesAdmin;