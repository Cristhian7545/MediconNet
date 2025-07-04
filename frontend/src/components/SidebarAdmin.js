// src/components/SidebarAdmin.js
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/styleheader.css"; // Asegúrate de tener este archivo

export default function SidebarAdmin() {
  return (
    <div className="sidebarr">
      <ul className="navbar-navv">
        {/* Nuevo botón para regresar */}
        <li className="nav-itemm">
          <Link className="nav-linkk" to="/nosotros">
            <i className="fas fa-arrow-left"></i> Regresar
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-linkk" to="/admin/doctores">
            <i className="fas fa-user-md"></i> Doctores
          </Link>
        </li>
        <li className="nav-itemm">
          <Link className="nav-link" to="/admin/pacientes">
            <i className="fas fa-procedures"></i> Pacientes
          </Link>
        </li>
        <li className="nav-itemm">
          <Link className="nav-linkk" to="/admin/horarios">
            <i className="fas fa-calendar-check"></i> Horarios
          </Link>
        </li>
        <li className="nav-itemm">
          <Link className="nav-linkk" to="/admin/reclamos">
            <i className="fas fa-exclamation-circle"></i> Historial de reclamos
          </Link>
        </li>
        <li className="nav-itemm">
          <Link className="nav-linkk" to="/admin/citas">
            <i className="fas fa-clock"></i> Historial de citas
          </Link>
        </li>
        <li className="nav-itemm">
          <Link className="nav-linkk" to="/admin/contactos">
            <i className="fas fa-address-book"></i> Contactos
          </Link>
        </li>
      </ul>
    </div>
  );
}
