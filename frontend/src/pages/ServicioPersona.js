import React, { useState } from 'react';
import '../assets/css/sub-servicios.css';

const tarjetas = [
  {
    titulo: "Consultas médicas",
    icono: "fa fa-water",
    descripcion: "Contamos con consultas generales y especializadas, así como servicios de urgencias y seguimiento para enfermedades crónicas",
    lista: [
      "Evaluaciones generales de salud",
      "Diagnóstico y tratamiento de enfermedades comunes",
      "Chequeos preventivos y programas de salud",
      "Consultas pediátricas",
      "Apoyo psicológico y consultas emocionales"
    ],
    modal: {
      titulo: "Consultas médicas",
      descripcion: "Las consultas médicas que ofrecemos están diseñadas para proporcionar atención integral y personalizada a nuestros pacientes, abordando una amplia gama de problemas de salud. Durante la consulta, se evalúa el estado general de salud del paciente, se revisan antecedentes médicos y familiares, y se realizan exámenes físicos o estudios diagnósticos según sea necesario. Nuestro objetivo es ofrecer una atención de calidad que no solo resuelva problemas médicos inmediatos, sino que también contribuya a la prevención de futuros problemas de salud.",
      img: "/img/se1.png",
      beneficios: [
        "Acceso a Profesionales Especializados: Consultas con médicos capacitados y con experiencia en diversas áreas de la salud.",
        "Diagnóstico y Tratamiento Preciso: Evaluación completa del estado de salud para ofrecer diagnósticos certeros y planes de tratamiento efectivos.",
        "Mejora en la Calidad de Vida: A través del tratamiento adecuado y la orientación, buscamos mejorar la calidad de vida del paciente.",
        "Seguimiento Continuo: Nuestro equipo asegura un seguimiento adecuado de las condiciones de salud a lo largo del tiempo, garantizando una atención médica continua."
      ]
    }
  },
  {
    titulo: "Examenes de laboratorio",
    icono: "fas fa-tint",
    descripcion: "Amplia gama de exámenes de laboratorio para apoyar el diagnóstico preciso y el seguimiento de la salud de nuestros pacientes.",
    lista: [
      "Análisis de sangre",
      "Pruebas de colesterol y glucosa",
      "Pruebas de función tiroidea",
      "Pruebas de embarazo y hormonas",
      "Test de alergias e intolerancias"
    ],
    modal: {
      titulo: "Examenes de laboratorio",
      descripcion: "El servicio de exámenes de laboratorio permite obtener información precisa y confiable sobre el estado de salud de cada paciente, facilitando el diagnóstico, seguimiento y prevención de enfermedades. Contamos con un laboratorio clínico equipado con tecnología moderna y personal altamente capacitado que garantiza resultados rápidos, seguros y confidenciales. Estos exámenes son fundamentales para detectar alteraciones antes de que aparezcan síntomas, monitorear tratamientos médicos y confirmar diagnósticos clínicos con mayor exactitud.",
      img: "/img/se2.png",
      beneficios: [
        "Diagnóstico Temprano y Preciso: Permiten detectar enfermedades en etapas iniciales, incluso antes de que aparezcan síntomas evidentes.",
        "Prevención de Enfermedades: Los chequeos regulares permiten anticiparse a posibles condiciones de salud y tomar medidas preventivas.",
        "Resultados Confiables y Rápidos: Utilizamos tecnología moderna que asegura precisión y entrega de resultados en tiempos óptimos.",
        "Apoyo al Diagnóstico Médico: Complementan las consultas clínicas proporcionando datos objetivos y específicos del estado del paciente.",
        "Confidencialidad Garantizada: Manejamos toda la información con estrictos protocolos de privacidad y seguridad de datos."
      ]
    }
  },
  {
    titulo: "Nutrición y bienestar",
    icono: "fas fa-water",
    descripcion: "Con planes personalizados que promueven hábitos alimenticios saludables.",
    lista: [
      "Asesoramiento nutricional personalizado",
      "Suplementación nutricional recomendada",
      "Educación sobre alimentación saludable y hábitos de vida",
      "Control y prevención de la obesidad",
      "Evaluación de composición corporal"
    ],
    modal: {
      titulo: "Nutrición y bienestar",
      descripcion: "Está enfocada en mejorar la calidad de vida de nuestros pacientes a través de una alimentación equilibrada, hábitos saludables y el manejo integral del cuerpo y la mente. Nuestros nutricionistas clínicos trabajan de forma personalizada para elaborar planes alimenticios adaptados a las necesidades específicas de cada persona, considerando su estado de salud, estilo de vida, edad, actividad física y objetivos personales.",
      img: "/img/se3.png",
      beneficios: [
        "Prevención y Control de Enfermedades: Apoyo en el tratamiento de patologías como obesidad, diabetes, hipertensión, colesterol alto, entre otras.",
        "Mejora en la Calidad de Vida: Al adoptar una alimentación más saludable y equilibrada, se mejora el estado de ánimo y el sueño.",
        "Educación Alimentaria: Orientación clara sobre cómo leer etiquetas, elegir alimentos adecuados y mantener buenos hábitos alimenticios a largo plazo.",
        "Enfoque Holístico: Se trabaja en la relación entre alimentación, emociones, actividad física y estilo de vida saludable."
      ]
    }
  },
  // ... Agrega las otras tarjetas igual ...
];

const faqs = [
  {
    pregunta: "¿Qué servicios médicos generales ofrece la clínica?",
    respuesta: "Contamos con consultas médicas generales, chequeos preventivos, control de enfermedades crónicas y atención primaria para toda la familia."
  },
  {
    pregunta: "¿Cómo puedo agendar una cita médica?",
    respuesta: "Para agendar una cita médica, primero debes registrarte en nuestra plataforma en línea. Una vez que hayas creado tu cuenta e iniciado sesión, podrás acceder al panel de usuario, seleccionar el servicio que necesitas, elegir al especialista y reservar la fecha y hora disponibles."
  },
  {
    pregunta: "¿La clínica ofrece atención psicológica?",
    respuesta: "Sí, ofrecemos servicios de salud mental con psicólogos certificados para atender consultas individuales, familiares y grupales."
  }
];


function ServicioPersona() {
  const [modalIndex, setModalIndex] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <div className="sub-servicios-page">
      {/* Carousel */}
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/servi1.png" className="d-block w-100" alt="Imagen 1" />
            <div className="carousel-caption text-start">
              <h1>Cuidamos de Ti, en Cada Etapa</h1>
              <p>Ofrecemos soluciones efectivas y a medida para cada necesidad.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/servi2.png" className="d-block w-100" alt="Imagen 2" />
            <div className="carousel-caption text-end">
              <h1>Innovación y Calidad</h1>
              <p>Nos adaptamos a tus necesidades con los mejores estándares.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* SERVICIOS TARJETAS */}
      <section className="pagina-servicios">
        <section className="servicios-container">
          <div className="experiencia-box">
            <h1>Servicio para<br />Personas</h1>
          </div>
          <div className="servicios-contenido">
            <h6 className="subtitulo">NUESTROS SERVICIOS</h6>
            <h1 className="titulo-principal">Explora los servicios que ofrecemos</h1>
            <div className="tarjetas-servicio">
              {tarjetas.map((tarjeta, idx) => (
                <div className="tarjeta" key={idx}>
                  <div className="icono-servicio">
                    <i className={tarjeta.icono}></i>
                  </div>
                  <h4>{tarjeta.titulo}</h4>
                  <p>{tarjeta.descripcion}</p>
                  <ul>
                    {tarjeta.lista.map((li, i) => (
                      <li key={i}><i className="fa fa-check text-success"></i> {li}</li>
                    ))}
                  </ul>
                  <button className="btn-leer-mas" onClick={() => setModalIndex(idx)}>
                    Detalle <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* MODAL (fuera del map de tarjetas) */}
      {modalIndex !== null && (
        <div className="modal show" tabIndex="-1" onClick={() => setModalIndex(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={() => setModalIndex(null)}>&times;</span>
            <div className="modal-header">
              <h2>{tarjetas[modalIndex].modal.titulo}</h2>
            </div>
            <div className="modal-body">
              <h3>Descripción del servicio</h3>
              <p>{tarjetas[modalIndex].modal.descripcion}</p>
              <img src={tarjetas[modalIndex].modal.img} alt={tarjetas[modalIndex].modal.titulo} />
              <br /><br />
              <h3>Beneficios</h3>
              <ul>
                {tarjetas[modalIndex].modal.beneficios.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-left">
              <h2 className="faq-title">Preguntas Frecuentes sobre Nuestros Servicios Clínicos</h2>
              <p className="faq-description">
                Aquí encontrarás respuestas a las dudas más comunes sobre los servicios que ofrecemos en nuestra clínica. Queremos ayudarte a entender mejor cómo cuidamos de ti y de tu salud.
              </p>
              {faqs.map((faq, idx) => (
                <div className="faq-item" key={idx}>
                  <button
                    className="faq-question"
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  >
                    Q: {faq.pregunta}
                  </button>
                  <div className="faq-answer" style={{ display: faqOpen === idx ? "block" : "none" }}>
                    <p>A: {faq.respuesta}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="faq-right">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="FAQ Illustration" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicioPersona;