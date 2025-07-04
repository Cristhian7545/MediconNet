import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorCard from './DoctorCard';

const ListaDoctores = () => {
  const [doctores, setDoctores] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [filtroSede, setFiltroSede] = useState('');
  const [filtroTurno, setFiltroTurno] = useState('');

  // Carga doctores
  useEffect(() => {
    fetch('http://localhost:8080/api/medicos')
      .then(res => res.json())
      .then(data => setDoctores(Array.isArray(data) ? data : []))
      .catch(() => setDoctores([]));
  }, []);

  // Carga horarios
  useEffect(() => {
    fetch('http://localhost:8080/api/horarios')
      .then(res => res.json())
      .then(data => setHorarios(Array.isArray(data) ? data : []))
      .catch(() => setHorarios([]));
  }, []);

  // Mapa de medicoId => Set(turnos)
  const medicoTurnos = {};
  horarios.forEach(h => {
    if (!medicoTurnos[h.medicoId]) medicoTurnos[h.medicoId] = new Set();
    if (h.turno) medicoTurnos[h.medicoId].add(h.turno.toLowerCase());
  });

  // Filtro robusto
  const doctoresFiltrados = doctores.filter((doctor) => {
    const nombreCompleto = `${doctor.nombres || ''} ${doctor.apellidos || ''}`.toLowerCase();
    const especialidad = doctor.especialidad ? doctor.especialidad.toLowerCase() : '';
    const sedeNombre = doctor.sede && doctor.sede.nombre ? doctor.sede.nombre.toLowerCase() : '';
    const turnos = medicoTurnos[doctor.id] ? Array.from(medicoTurnos[doctor.id]) : [];

    return (
      nombreCompleto.includes(filtroNombre.toLowerCase()) &&
      especialidad.includes(filtroEspecialidad.toLowerCase()) &&
      (filtroSede === '' || sedeNombre.includes(filtroSede.toLowerCase())) &&
      (filtroTurno === '' || turnos.some(turno => turno.includes(filtroTurno.toLowerCase())))
    );
  });

  return (
    <>

      {/* Contenido principal */}
      <div className="container py-4">
        <h2 className="mb-4">Nuestro Plantel Médico</h2>
        <p className="lead mt-3">Contamos con un equipo de profesionales altamente calificados y comprometidos con la excelencia en servicios médicos</p>
        <div className="row">
          {/* Filtros a la izquierda */}
          <div className="col-md-3 mb-4">
            <div className="card p-3">
              <h5>Filtros</h5>
              <div className="mb-3">
                <label className="form-label">Buscar por nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                  placeholder="Ingrese el nombre..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Especialidad:</label>
                <input
                  type="text"
                  className="form-control"
                  value={filtroEspecialidad}
                  onChange={(e) => setFiltroEspecialidad(e.target.value)}
                  placeholder="Ingrese especialidad..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Buscar por sede:</label>
                <input
                  type="text"
                  className="form-control"
                  value={filtroSede}
                  onChange={(e) => setFiltroSede(e.target.value)}
                  placeholder="Ingrese la sede..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Buscar por turno:</label>
                <input
                  type="text"
                  className="form-control"
                  value={filtroTurno}
                  onChange={(e) => setFiltroTurno(e.target.value)}
                  placeholder="Ingrese el turno (ej: mañana, tarde)..."
                />
              </div>
            </div>
          </div>

          {/* Tarjetas de doctores */}
          <div className="col-md-9">
            <div className="row">
              {doctoresFiltrados.map((doctor, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <DoctorCard doctor={doctor} turnos={medicoTurnos[doctor.id] ? Array.from(medicoTurnos[doctor.id]) : []} />
                </div>
              ))}
              {doctoresFiltrados.length === 0 && (
                <p>No se encontraron doctores con esos filtros.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaDoctores;
