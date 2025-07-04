import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/sucursal.css"; // Asegúrate de tener este archivo o el CSS correspondiente

function Red() {
  const [sedes, setSedes] = useState([]);
  const [region, setRegion] = useState("all");
  const [modal, setModal] = useState({ open: false, sede: null });
  const navigate = useNavigate();

  // Comprobamos el rol desde el localStorage
  const rol = localStorage.getItem("rol");

  // Cargar sedes del backend
  useEffect(() => {
    fetch("http://localhost:8080/api/sedes")
      .then(res => res.json())
      .then(data => setSedes(Array.isArray(data) ? data : []))
      .catch(err => setSedes([]));
  }, []);

  // Filtro por región
  const sedesFiltradas =
    region === "all"
      ? sedes
      : sedes.filter(s => s.region && s.region.toLowerCase() === region);

  // Comprobar autenticación
  const isLoggedIn = Boolean(localStorage.getItem("jwt"));

  // Handler para botones protegidos
  const handleProtectedClick = (ruta) => {
    if (isLoggedIn) {
      navigate(ruta);
    } else {
      navigate("/login");
    }
  };

  // Mostrar modal con detalles de la sede
  const showModal = sede => setModal({ open: true, sede });
  const closeModal = () => setModal({ open: false, sede: null });

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          background: `url('/img/sede5.jpg') center/cover no-repeat`,
          height: "500px",
        }}
      >
        <div className="container">
          <div className="text-start ps-md-5">
            <h1 className="fw-bold mb-3">
              Estamos siempre cerca para darte una mejor atención
            </h1>
            <div className="d-flex gap-3">
              {/* Verificar si el rol es admin y si es admin, no mostrar los botones */}
              {rol !== "1" && (
                <>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => handleProtectedClick("/reserva")}
                  >
                    Agendar tu cita
                  </button>
                  <button
                    className="btn btn-light btn-lg text-dark border border-white"
                    onClick={() => handleProtectedClick("/citas")}
                  >
                    Ver citas
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filtro de región */}
      <section className="fondo-section">
        <div className="col">
          <div className="row justify-content-center align-items-center p-5 m-5 border border-black">
            <div className="text-center">
              <i
                className="bi bi-eye-fill"
                style={{ fontSize: "4rem", color: "#006C84" }}
              ></i>
            </div>
            <h2 className="fw-bold text-center mb-5">NUESTRAS SUCURSALES</h2>
            <div className="filter row justify-content-center align-items-center">
              <div className="col-12 col-sm-3 text-center">
                <label htmlFor="region" className="form-label">
                  Filtrar por región:
                </label>
              </div>
              <div className="col-12 col-sm-3">
                <select
                  id="region"
                  className="form-select"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                >
                  <option value="all">Todo</option>
                  <option value="piura">Piura</option>
                  <option value="arequipa">Arequipa</option>
                  <option value="lima">Lima</option>
                  {/* Agrega más si hay más regiones */}
                </select>
              </div>
              <div className="col-12 col-sm-3"></div>
            </div>
          </div>
        </div>

        {/* Lista de sucursales */}
        <div className="col">
          <div className="row p-5 m-5 border border-black">
            <div className="sucursales row" id="sucursales">
              {sedesFiltradas.length === 0 && (
                <div className="text-center">No hay sucursales para mostrar.</div>
              )}
              {sedesFiltradas.map(sede => (
                <div
                  key={sede.id_sede}
                  className="sucursal col-md-4 mb-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => showModal(sede)}
                >
                  <img
                    src={sede.imagenUrl || "assets/img/default-sede.png"}
                    alt={sede.nombre}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <h2
                    className="fw-bold text-center mt-3"
                    style={{ fontSize: "1.2rem", color: "#333" }}
                  >
                    {sede.nombre}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de mapa */}
        {modal.open && modal.sede && (
          <div
            className="modal"
            style={{
              display: "block",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              zIndex: 1000,
            }}
            onClick={closeModal}
          >
            <div
              className="modal-content"
              style={{
                background: "#fff",
                margin: "10% auto",
                padding: "20px",
                width: "90%",
                maxWidth: "600px",
                position: "relative",
              }}
              onClick={e => e.stopPropagation()}
            >
              <span
                className="close"
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                  fontSize: "28px",
                  cursor: "pointer",
                }}
              >
                &times;
              </span>
              <h2>{modal.sede.nombre}</h2>
              <p>{modal.sede.descripcion}</p>
              <iframe
                src={modal.sede.mapaUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={modal.sede.nombre}
              ></iframe>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Red;
