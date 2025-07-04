import React, { useState } from "react";
import '../assets/css/register.css';

function Register() {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    username: "",
    email: "",
    password: "",
    telefono: "",
    direccion: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar registro al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.text();
        throw new Error(data || "Error al registrar usuario");
      }

      setSuccess("¡Registro exitoso! Redirigiendo a inicio de sesión...");
      setForm({
        nombres: "",
        apellidos: "",
        username: "",
        email: "",
        password: "",
        telefono: "",
        direccion: ""
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container register-container" style={{marginTop: "60px"}}>
      <div className="row g-0">
        {/* Columna de formulario */}
        <div className="col-lg-6 register-form">
          <div className="text-center mb-5">
            <i className="bi bi-person-plus-fill logo" style={{fontSize: 48, color: "#0d6efd"}}></i>
            <h1 className="h3 fw-bold">Crear Cuenta</h1>
            <p className="text-muted">Completa tus datos para registrarte</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Nombres</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                  <input type="text" className="form-control" name="nombres" required value={form.nombres} onChange={handleChange} />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Apellidos</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                  <input type="text" className="form-control" name="apellidos" required value={form.apellidos} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Nombre de Usuario</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person-badge"></i></span>
                <input type="text" className="form-control" name="username" required value={form.username} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Correo Electrónico</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope-at"></i></span>
                <input type="email" className="form-control" name="email" required value={form.email} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input type="password" className="form-control" name="password" required minLength={6} value={form.password} onChange={handleChange} />
              </div>
              <div className="form-text">Mínimo 6 caracteres</div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Teléfono</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                <input type="tel" className="form-control" name="telefono" required value={form.telefono} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-medium">Dirección</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
                <textarea className="form-control" name="direccion" rows={2} required value={form.direccion} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" id="terms" required />
              <label className="form-check-label" htmlFor="terms">
                Acepto los <a href="#" className="text-decoration-none">Términos y Condiciones</a>
              </label>
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}
            <button type="submit" className="btn btn-primary w-100 py-2 btn-register" disabled={loading}>
              {loading ? "Registrando..." : "Registrar Cuenta"}
            </button>
            <div className="additional-links mt-3">
              ¿Ya tienes una cuenta? <a href="/login" className="text-decoration-none">Inicia Sesión</a>
            </div>
          </form>
        </div>
        {/* Columna de imagen */}
        <div className="col-lg-6 d-none d-lg-block register-image"></div>
      </div>
    </div>
  );
}

export default Register;
