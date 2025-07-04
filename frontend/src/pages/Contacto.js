import React, { useState } from "react";
import "../assets/css/contacto.css";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEnviado(false);

    const token = localStorage.getItem("jwt"); // <-- Obtener el token si está logueado

    try {
      const res = await fetch("http://localhost:8080/api/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }) // Solo lo pone si existe el token
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setEnviado(true);
        setForm({ nombre: "", apellido: "", email: "", telefono: "", mensaje: "" });
      } else {
        const text = await res.text();
        setError("Error al enviar: " + text);
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-text-center">
            <h4 className="text-primary">Contacto</h4>
            <h1>
              Tu mensaje es importante para nosotros.<br />
              ¡Cuéntanos qué necesitas!
            </h1>
          </div>

          <div className="contact-content">
            <div className="contact-img">
              <div className="contact-img-inner">
                <img src="/img/con1.png" alt="Contact" />
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h4 className="text-primary">Contáctanos</h4>
              <p>Deja tus datos y tu consulta, y nos comunicaremos contigo</p>
              <br />

              <div className="contact-row">
                <div className="contact-form-floating" style={{ flex: 1 }}>
                  <input type="text" id="nombre" placeholder="Nombre" required value={form.nombre} onChange={handleChange} />
                  <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="contact-form-floating" style={{ flex: 1 }}>
                  <input type="text" id="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
                  <label htmlFor="apellido">Apellido</label>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-form-floating" style={{ flex: 1 }}>
                  <input type="email" id="email" placeholder="Email" required value={form.email} onChange={handleChange} />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="contact-form-floating" style={{ flex: 1 }}>
                  <input type="text" id="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
                  <label htmlFor="telefono">Teléfono</label>
                </div>
              </div>

              <div className="contact-form-floating" style={{ marginTop: "1rem" }}>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Mensaje"
                  style={{ width: "100%", height: "150px" }}
                  required
                  value={form.mensaje}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="mensaje">Mensaje</label>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <button type="submit" className="contact-btn">
                  Enviar mensaje
                </button>
              </div>

              {enviado && <div className="alert alert-success mt-3">¡Mensaje enviado correctamente!</div>}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </section>
      {/* ... lo demás igual ... */}
      <section className="contact-info-map">
        {/* ... sin cambios ... */}
      </section>
    </div>
  );
}

export default Contacto;
