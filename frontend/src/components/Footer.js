import React from "react";
import "../assets/css/footer.css"; // Si tienes CSS personalizado para el footer
import logo from "../assets/img/logitoo.png"; // Ajusta la ruta si es necesario

function Footer() {
  return (
    <footer
      id="mediconect-footer"
      className="mediconect-footer"
      style={{
        background: "linear-gradient(90deg, #2e3b83 60%, #4e54c8 100%)",
        color: "#fff",
        paddingTop: "2rem",
        paddingBottom: "1rem",
      }}
    >
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-3 text-center">
            <img
              src={logo}
              alt="Logo Mediconect"
              style={{
                maxWidth: 200,
                borderRadius: "5%",
                background: "#fff",
                padding: 1,
              }}
            />
          </div>
        </div>
        <hr style={{ borderTop: "1px solid #7c4dff", opacity: 0.3 }} />
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Mediconect</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p>
                  Donde nos enfocamos en brindarle un servicio de calidad, porque su salud es lo más importante para nosotros.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Servicios</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p>
                  <a href="#" className="text-white text-decoration-none">
                    Personales
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white text-decoration-none">
                    Eventos
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white text-decoration-none">
                    Médicos
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contáctanos</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p>
                  <i className="fas fa-envelope me-2"></i> Mediconect@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-2"></i> +01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-2"></i> +01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr style={{ borderTop: "1px solid #7c4dff", opacity: 0.2 }} />
        <div className="text-center" style={{ fontSize: "0.9rem", color: "#bdbdbd" }}>
          © 2025 Mediconect. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
