import React from "react";
import "../assets/css/servicios.css"; // Usa el css de arriba

function Servicios() {
  return (
    <div className="servicios-page">
      {/* Hero Section */}
      <section id="hero" className="hero-section py-5 text-dark position-relative">
        <div className="container">
          <div className="row align-items-center justify-content-between h-100">
            {/* Text Section */}
            <div className="col-lg-6 section-servicios">
              <h1 className="display-5 fw-bold">
                Nuestros servicios médicos <span className="highlight">Pensados en tí</span>
              </h1>
              <p className="lead mt-3">Descubre cómo podemos ayudarte a vivir mejor</p>
              <div className="d-flex gap-3 mt-4">
                <a href="/contacto" className="btn btn-success btn-lg">Contáctanos</a>
                <a href="https://youtu.be/xEax06A7qtw?feature=shared" className="btn btn-outline-dark d-flex align-items-center">
                  <i className="bi bi-play-circle me-2"></i> Video
                </a>
              </div>
            </div>

            {/* Images Section alineado verticalmente */}
            <div className="col-lg-6 d-flex justify-content-end align-items-center">
              <div className="d-flex justify-content-end align-items-end position-relative floating-image-wrapper">
                <img src="/img/servi3.png" className="floating-img img-left" alt="Imagen 1" />
                <img src="/img/servi4.png" className="floating-img img-right" alt="Imagen 2" />
              </div>
            </div>
          </div>
        </div>

        {/* OLAS PRONUNCIADAS */}
        <div className="animated-waves">
          <svg className="wave wave1" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.4" d="M0,160 C240,20 480,300 720,160 C960,20 1200,300 1440,160 L1440,320 L0,320 Z"></path>
          </svg>
          <svg className="wave wave2" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.6" d="M0,180 C240,40 480,320 720,180 C960,40 1200,320 1440,180 L1440,320 L0,320 Z"></path>
          </svg>
          <svg className="wave wave3" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,200 C240,60 480,340 720,200 C960,60 1200,340 1440,200 L1440,320 L0,320 Z"></path>
          </svg>
        </div>
      </section>

      {/* Servicios debajo del Hero */}
      <section className="service py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5" style={{ maxWidth: 800 }}>
            <h4 className="text-primary">Nuestros Servicios</h4>
            <h1 className="display-4 mb-4">Lo que ofrecemos</h1>
            <p className="mb-0 lead">Contamos con los mejores servicios diseñados para ti.</p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6">
              <div className="service-item overlay-top">
                <div className="service-img">
                  <img src="/img/servi6.png" alt="" />
                  <div className="service-icon p-3">
                    <i className="bi bi-heart-pulse fs-2"></i>
                  </div>
                </div>
                <div className="service-content p-4 hover-overlay">
                  <div className="service-content-inner">
                    <h4 className="mb-4">Servicio para personas</h4>
                    <p className="mb-4">Cuidamos tu salud de forma cercana y personalizada</p>
                    <a className="btn btn-primary rounded-pill py-2 px-4" href="/servicio-persona">Leer Más</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="service-item overlay-top">
                <div className="service-img">
                  <img src="/img/servi5.png" className="img-fluid rounded-top w-100" alt="" />
                  <div className="service-icon p-3">
                    <i className="bi bi-shield-check fs-2"></i>
                  </div>
                </div>
                <div className="service-content p-4 hover-overlay">
                  <div className="service-content-inner">
                    <h4 className="mb-4">Eventos de salud</h4>
                    <p className="mb-4">Iniciativas que promueven el bienestar en tu comunidad.</p>
                    <a className="btn btn-primary rounded-pill py-2 px-4" href="/servicio-evento">Leer Más</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h4 className="text-primary">Testimonios</h4>
          <h1 className="display-5">Lo que dicen nuestros clientes</h1>
          <p className="texto-descripcion lead">
            <br />
            Nuestro compromiso con la excelencia se refleja en la satisfacción de quienes han confiado en nosotros.
          </p>
        </div>
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="row">
                {/* Testimonio 1 */}
                <div className="col-md-6">
                  <div className="testimonial-card d-flex">
                    <div className="col-4 pe-3">
                      <img src="https://randomuser.me/api/portraits/men/12.jpg" className="img-fluid testimonial-img" alt="cliente 1" />
                    </div>
                    <div className="col-8">
                      <h5>Juan Pérez</h5>
                      <p className="text-muted mb-1">Diseñador</p>
                      <div className="text-warning mb-2">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                      <p>Excelente atención y resultados. ¡Volveré sin dudarlo!</p>
                    </div>
                  </div>
                </div>

                {/* Testimonio 2 */}
                <div className="col-md-6">
                  <div className="testimonial-card d-flex">
                    <div className="col-4 pe-3">
                      <img src="https://randomuser.me/api/portraits/women/24.jpg" className="img-fluid testimonial-img" alt="cliente 2" />
                    </div>
                    <div className="col-8">
                      <h5>Ana Gómez</h5>
                      <p className="text-muted mb-1">Arquitecta</p>
                      <div className="text-warning mb-2">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <p>Muy profesionales. Recomendado al 100%.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="row">
                {/* Testimonio 3 */}
                <div className="col-md-6">
                  <div className="testimonial-card d-flex">
                    <div className="col-4 pe-3">
                      <img src="https://randomuser.me/api/portraits/men/65.jpg" className="img-fluid testimonial-img" alt="cliente 3" />
                    </div>
                    <div className="col-8">
                      <h5>Pedro Ramírez</h5>
                      <p className="text-muted mb-1">Desarrollador</p>
                      <div className="text-warning mb-2">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <p>Buen servicio, aunque podría mejorar un poco la comunicación.</p>
                    </div>
                  </div>
                </div>
                {/* Testimonio 4 */}
                <div className="col-md-6">
                  <div className="testimonial-card d-flex">
                    <div className="col-4 pe-3">
                      <img src="https://randomuser.me/api/portraits/women/41.jpg" className="img-fluid testimonial-img" alt="cliente 4" />
                    </div>
                    <div className="col-8">
                      <h5>Laura Sánchez</h5>
                      <p className="text-muted mb-1">Marketing</p>
                      <div className="text-warning mb-2">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <p>Una experiencia fluida y fácil. Muy contenta con el resultado.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controles */}
          <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span><i className="fas fa-chevron-left text-white"></i></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span><i className="fas fa-chevron-right text-white"></i></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Servicios;
