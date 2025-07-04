import React, { useState } from 'react';
import '../assets/css/sub-servicios.css'; // Asegúrate de que el CSS tiene el prefijo .sub-servicios-page

// Tarjetas de eventos de salud
const tarjetas = [
  {
    titulo: "Categorias de salud",
    icono: "fa fa-water",
    descripcion: "Agrupamos nuestras acciones, campañas y actividades en distintas áreas clave de la salud, para informar, educar y prevenir",
    lista: [
      "Salud Familiar y Comunitaria",
      "Salud Infantil y Adolescente",
      "Salud Mental y Bienestar Emocional",
      "Salud Sexual y Reproductiva"
    ],
    modal: {
      titulo: "Categorias de salud",
      descripcion: "Esta sección organiza y presenta diferentes áreas temáticas relacionadas con la salud, permitiendo a los usuarios explorar contenido, campañas, jornadas y recursos educativos de manera clara y enfocada. Su propósito es informar, prevenir y promover el bienestar general en la comunidad, más allá de la atención médica directa.",
      img: "/img/eve1.png",
      beneficios: [
        "Facilita el acceso a información relevante: Ayuda a los usuarios a encontrar rápidamente temas de salud que les interesen o afecten directamente.",
        "Fomenta la prevención y el autocuidado: Ofrece recursos y consejos prácticos para mantener una vida saludable y prevenir enfermedades.",
        "Promueve la participación en actividades comunitarias: Conecta al usuario con campañas, charlas o jornadas según la categoría de salud que necesite.",
        "Educa de forma clara y segmentada: Permite difundir información especializada en áreas como salud mental, nutrición, salud sexual, etc., de manera accesible.",
        "Refuerza el compromiso de la clínica con el bienestar integral: Demuestra que el enfoque no es solo curativo, sino también educativo y preventivo."
      ]
    }
  },
  {
    titulo: "Capacitaciones",
    icono: "fas fa-tint",
    descripcion: "Esta sección está dedicada a ofrecer programas de formación, talleres y cursos dirigidos a profesionales de la salud y público interesado",
    lista: [
      "Capacitación en Primeros Auxilios y RCP",
      "Salud Mental y Manejo de Estrés en Profesionales de la Salud",
      "Actualización Médica y Tratamientos Avanzados",
      "Capacitación en Uso de Tecnologías Médicas",
      "Ética Médica y Derechos del Paciente"
    ],
    modal: {
      titulo: "Capacitaciones",
      descripcion: "En nuestra clínica creemos en el valor del aprendizaje continuo como parte fundamental para brindar una atención de salud de calidad. Por eso, en esta sección ofrecemos programas de formación, cursos, talleres y actividades educativas dirigidos tanto a profesionales del área médica como a personas interesadas en ampliar sus conocimientos en salud.",
      img: "/img/eve2.png",
      beneficios: [
        "Fortalece las competencias del personal de salud: Brinda formación continua en áreas médicas, tecnológicas y de gestión clínica, mejorando la calidad del servicio.",
        "Promueve la actualización profesional: Ofrece acceso a conocimientos actualizados, nuevas técnicas, normativas y enfoques terapéuticos.",
        "Fomenta la atención segura y de calidad: Las capacitaciones ayudan a garantizar prácticas más seguras, eficientes y centradas en el paciente.",
        "Impulsa el desarrollo humano y comunitario: Al incluir también al público general, se contribuye a una sociedad más informada, responsable y participativa en temas de salud.",
        "Conecta la teoría con la práctica clínica: Mediante talleres prácticos, simulaciones o jornadas intensivas, se facilita el aprendizaje aplicado."
      ]
    }
  },
  {
    titulo: "Jornada de adultos mayores",
    icono: "fas fa-water",
    descripcion: "Actividades y servicios diseñados específicamente para el cuidado, apoyo y bienestar de las personas mayores.",
    lista: [
      "Atención Médica Preventiva y Evaluaciones de Salud",
      "Asesoría Nutricional y Dieta Saludable",
      "Actividades Físicas Adaptadas",
      "Prevención de Caídas y Seguridad en el Hogar",
      "Actividades Recreativas y Culturales"
    ],
    modal: {
      titulo: "Jornada de adultos mayores",
      descripcion: "En nuestra clínica valoramos profundamente a las personas mayores y reconocemos la importancia de brindarles espacios dedicados a su bienestar físico, emocional y social. Por eso, organizamos jornadas especiales enfocadas en el cuidado integral del adulto mayor, promoviendo una vida activa, saludable y digna en esta etapa de la vida.",
      img: "/img/eve3.png",
      beneficios: [
        "Previenen enfermedades y complicaciones: A través de chequeos regulares, educación en salud y seguimiento personalizado.",
        "Fomentan la autonomía y el autocuidado: Brindan herramientas y orientación para que los adultos mayores puedan cuidar su salud de forma activa e independiente.",
        "Favorecen la socialización y el bienestar: Generan espacios de encuentro que promueven la interacción, la recreación y la participación comunitaria.",
        "Ofrecen acompañamiento profesional: Cada actividad está guiada por especialistas en geriatría, fisioterapia, nutrición, psicología, entre otros.",
        "Mejoran la calidad de vida: Al integrar salud, actividad física, alimentación, recreación y contención emocional en una sola jornada."
      ]
    }
  },
  {
    titulo: "Campañas de sensibilización",
    icono: "fas fa-briefcase-medical",
    descripcion: "Actividades para aumentar la conciencia sobre problemas de salud específicos en la comunidad.",
    lista: [
      "Campañas sobre prevención de enfermedades (ej. cáncer, VIH, enfermedades cardiovasculares)",
      "Programas educativos sobre higiene y salud pública",
      "Distribución de materiales informativos",
      "Eventos de sensibilización durante el Mes de la Concientización sobre el Cáncer.",
      "Campañas en redes sociales para sensibilizar sobre la salud emocional."
    ],
    modal: {
      titulo: "Campañas de sensibilización",
      descripcion: "Nuestras campañas de sensibilización tienen como objetivo informar, educar y generar conciencia en la comunidad sobre temas clave de salud y bienestar. Estas iniciativas buscan transformar hábitos, eliminar estigmas y fomentar una cultura de prevención, promoviendo una ciudadanía más empática, responsable y comprometida.",
      img: "/img/eve4.png",
      beneficios: [
        "Aumentan el conocimiento sobre temas de salud importantes: Brindan información clara y verificada que ayuda a prevenir enfermedades y actuar a tiempo.",
        "Fomentan cambios positivos en la conducta: Motivan a adoptar hábitos saludables y responsables, tanto a nivel individual como colectivo.",
        "Reducen el estigma y la desinformación: Abordan temas sensibles como salud mental, VIH, discapacidad o violencia con empatía y datos reales.",
        "Impulsan la participación comunitaria: Involucran a escuelas, empresas, familias y organizaciones en torno a causas de salud relevantes.",
        "Refuerzan el rol social de la clínica: Posicionan a la institución como un agente activo en la educación y el bienestar de la población."
      ]
    }
  },
  {
    titulo: "Control para empresas",
    icono: "fas fa-heart",
    descripcion: "Programas de salud ocupacional dirigidos a empresas para cuidar a sus empleados.",
    lista: [
      "Exámenes médicos preventivos para empleados",
      "Talleres de bienestar laboral (ergonomía, prevención de estrés)",
      "Charlas sobre prevención de accidentes en el trabajo",
      "Campañas de vacunación dentro de las empresas"
    ],
    modal: {
      titulo: "Control para empresas",
      descripcion: "Nuestra clínica ofrece un servicio especializado de Control de Empresas, enfocado en la salud y el bienestar laboral. Este servicio permite a las organizaciones llevar un seguimiento médico preventivo, diagnóstico y de control para sus trabajadores, asegurando condiciones de trabajo saludables, cumplimiento normativo y una mejora en la productividad.",
      img: "/img/eve5.png",
      beneficios: [
        "Previene enfermedades laborales y ausentismo: Identifica factores de riesgo y actúa de manera anticipada para evitar bajas médicas y accidentes.",
        "Cumple con normativas legales y laborales: Garantiza que la empresa esté alineada con los requisitos en salud ocupacional establecidos por la legislación vigente.",
        "Mejora el rendimiento y la productividad: Un trabajador saludable rinde mejor y se siente más comprometido con su entorno laboral.",
        "Fortalece la imagen y responsabilidad social de la empresa: Refleja una cultura organizacional preocupada por el bienestar y la calidad de vida de sus colaboradores.",
        "Ofrece datos y reportes útiles para la gestión empresarial: Los controles permiten obtener información relevante para tomar decisiones en prevención y recursos humanos."
      ]
    }
  }
];

// FAQ de eventos
const faqs = [
  {
    pregunta: "¿Qué tipo de eventos de salud organiza la clínica?",
    respuesta: "Organizamos campañas de vacunación, ferias de salud, charlas educativas, jornadas de despistaje y talleres sobre prevención de enfermedades."
  },
  {
    pregunta: "¿Con qué frecuencia se realizan los eventos de salud?",
    respuesta: "Organizamos eventos de forma mensual, aunque también realizamos actividades especiales en fechas importantes del calendario de salud."
  },
  {
    pregunta: "¿Los eventos tienen algún costo?",
    respuesta: "La mayoría de nuestros eventos son gratuitos y están abiertos a toda la comunidad. En caso de eventos especiales con cupo limitado, se indicará claramente si existe algún costo simbólico."
  }
];


function ServicioEvento() {
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
            <img src="/img/servi7.png" className="d-block w-100" alt="Imagen 1" />
            <div className="carousel-caption text-start">
              <h1>Jornadas de Prevención y Detección Temprana</h1>
              <p>Espacios gratuitos donde las personas pueden acceder a controles médicos básicos, charlas informativas y orientación profesional para cuidar su salud.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/servi8.png" className="d-block w-100" alt="Imagen 2" />
            <div className="carousel-caption text-end">
              <h1>Actividades Comunitarias de Bienestar</h1>
              <p>Talleres, campañas y actividades que promueven hábitos saludables, desde nutrición hasta salud mental, pensados para toda la familia.</p>
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
            <h1>Eventos de<br />Salud</h1>
          </div>
          <div className="servicios-contenido">
            <h6 className="subtitulo">NUESTROS SERVICIOS</h6>
            <h1 className="titulo-principal">Explora nuestro servicios</h1>
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

      {/* MODAL: solo uno, fuera del map */}
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
              <h2 className="faq-title">Preguntas Frecuentes sobre Nuestros Eventos de Salud</h2>
              <p className="faq-description">
                Consulta las dudas más comunes sobre los eventos de salud que organizamos. Nuestro objetivo es promover el bienestar comunitario mediante actividades informativas, preventivas y gratuitas.
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
              <img src="https://cdn-icons-png.flaticon.com/512/4403/4403531.png" alt="FAQ Illustration" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicioEvento;