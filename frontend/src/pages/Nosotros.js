import React from 'react';
import '../assets/css/nosotros.css';

function Nosotros() {
  return (
    <>
      {/* Sección Nosotros */}
      <section id="hero" className="hero-section py-5 text-dark position-relative">
        <div className="container">
          <div className="row align-items-center justify-content-between h-100">

            {/* Imagen alineada a la izquierda */}
            <div className="col-lg-6 image-wrapper-left">
              <img src="/img/hospital.png" className="img-left" alt="Imagen Nosotros" />
            </div>

            {/* Texto a la derecha */}
            <div className="col-lg-6 section-nosotros">
              <h1 className="display-5 fw-bold">En Clínicas Mediconect eres <span className="highlight">Nuestra prioridad</span></h1>
              <p className="lead mt-3">DESCUBRE LOS VALORES DE NUESTRA EMPRESA</p>
            </div>
          </div>
        </div>

        {/* OLAS */}
        <div className="animated-waves">
          <svg className="wave wave1" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.4"
              d="M0,160 C240,20 480,300 720,160 C960,20 1200,300 1440,160 L1440,320 L0,320 Z"></path>
          </svg>
          <svg className="wave wave2" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.6"
              d="M0,180 C240,40 480,320 720,180 C960,40 1200,320 1440,180 L1440,320 L0,320 Z"></path>
          </svg>
          <svg className="wave wave3" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1"
              d="M0,200 C240,60 480,340 720,200 C960,60 1200,340 1440,200 L1440,320 L0,320 Z"></path>
          </svg>
        </div>
      </section>

      {/* Sección Info */}
      <section className="info-section py-5">
        <div className="container" style={{ maxWidth: 900 }}>
          <h1 className="text-center display-4 mb-4">Nacimos para cuidar de ti tanto estando cerca, como lejos</h1>
          <div className="row align-items-center" style={{ minHeight: 250 }}>
            <div className="col-md-6 d-flex align-items-center">
              <p className="lead m-0 text-center">
                <strong>MEDICONNECT</strong> ofrece una experiencia integral marcada por la excelencia médica y la sensibilidad humana.
              </p>
            </div>
            <div className="col-md-6">
              <p className="text-justify">
                Nos enfocamos en brindar tranquilidad a nuestros pacientes y sus familias a través de una red integrada de clínicas, centros médicos y servicios móviles. Nuestro equipo combina ética profesional, calidad técnica y un trato humano en cada atención.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Historia */}
      <section className="py-5 bg-light text-dark">
        <div className="container">
          <h2 className="text-center display-4 mb-4">Nuestra Historia</h2>
          <p className="text-center mb-4" style={{ maxWidth: 800, margin: "auto" }}>
            MEDICONNECT nació con el firme propósito de transformar la atención médica en el país. Desde nuestros inicios, hemos crecido con cada paciente, ampliando nuestros servicios, fortaleciendo nuestras especialidades y construyendo una red sólida que conecta a personas con salud de calidad, sin importar la distancia.
          </p>
        </div>
      </section>

      {/* Sección Misión y Visión */}
      <section className="py-5 bg-white text-dark">
        <div className="container">
          <div className="row">
            {/* Misión */}
            <div className="col-md-6">
              <h1 className="display-4 mb-4">Misión</h1>
              <p>
                Brindar atención médica integral con excelencia profesional, calidad humana y accesibilidad, garantizando el bienestar de nuestros pacientes en cada etapa de su vida.
              </p>
              <img src="/img/mision.jpg" alt="Imagen Misión" className="img-fluid mt-3 rounded" style={{ height: 250, objectFit: "cover", width: "100%" }} />

            </div>
            {/* Visión */}
            <div className="col-md-6">
              <h1 className="display-4 mb-4">Visión</h1>
              <p>
                Ser la red de clínicas líder en salud del país, reconocida por su innovación, calidad asistencial y compromiso social, acercando la medicina a todos los rincones del Perú.
              </p>
              <img src="/img/vision.jpg" alt="Imagen Visión" className="img-fluid mt-3 rounded" style={{ height: 250, objectFit: "cover", width: "100%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Sección servicios destacados */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="text-center display-4 mb-4">Tenemos lo que estás buscando</h1>
          <div className="row g-4 justify-content-center">
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <div className="mb-3 fs-1">🩺</div>
                <h5 className="fw-bold">+20 especialidades</h5>
                <p>Atención completa para ti y tu familia.</p>
                <a href="#" className="btn btn-outline-primary btn-sm">VER MÁS</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <div className="mb-3 fs-1">👨‍⚕️</div>
                <h5 className="fw-bold">Médicos expertos</h5>
                <p>Profesionales altamente calificados y humanos.</p>
                <a href="#" className="btn btn-outline-primary btn-sm">VER MÁS</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <div className="mb-3 fs-1">📍</div>
                <h5 className="fw-bold">Siempre cerca</h5>
                <p>Clínicas, postas y servicios móviles a tu alcance.</p>
                <a href="/red" className="btn btn-outline-primary btn-sm">VER MÁS</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <div className="mb-3 fs-1">📋</div>
                <h5 className="fw-bold">Servicios</h5>
                <p>Servicios personalizados pensados en nuestros pacientes.</p>
                <a href="/servicios" className="btn btn-outline-primary btn-sm">VER MÁS</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Nosotros;
