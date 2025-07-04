import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/header.css';
import logo from "../assets/img/logitoo.png";

function Header() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  const rol = localStorage.getItem("rol");

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  // Determinar a dónde va el enlace de perfil y el texto
  let perfilTexto = "Cuenta";
  let perfilRuta = "/perfil";
  if (jwt && rol === "1") {
    perfilTexto = "CRUD";
    perfilRuta = "/admin/pacientes";
  } else if (jwt && rol === "2") {
    perfilTexto = "Perfil Médico";
    perfilRuta = "/citas-medico";
  } else if (jwt && rol === "3") {
    perfilTexto = "Perfil";
    perfilRuta = "/Citas";
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid header-wrapper">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className="navbar-nav flex-row align-items-center ms-auto gap-4">
          <li className="nav-item">
            <Link className="nav-link" to="/nosotros"><i className="fa-solid fa-house"></i> Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/red"><i className="fa-solid fa-gauge"></i> Red</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/servicios"><i className="fa-solid fa-table-cells"></i> Servicios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/medicos"><i className="fa-solid fa-border-all"></i> Médicos</Link>
          </li>
          {/* Dropdown Cuenta */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="cuentaDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user"></i>{" "}
              {jwt && username ? username : "Cuenta"}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cuentaDropdown">
              {!jwt ? (
                <li>
                  <Link className="dropdown-item" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to={perfilRuta}>
                      {perfilTexto}
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
