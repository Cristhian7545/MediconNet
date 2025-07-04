import React, { useState } from 'react';
import '../assets/css/login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });

      if (!res.ok) {
        throw new Error('Credenciales incorrectas');
      }
      // Espera un JSON: { token: '...', username: '...' }
      const data = await res.json();
      localStorage.setItem('jwt', data.token);
localStorage.setItem('username', data.username);
localStorage.setItem('rol', data.rol);  // <-- Guardas el rol aquí

      // Redirige al home o página protegida
      window.location.href = '/nosotros';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container login-container" style={{ marginTop: "60px" }}>
      <div className="row g-0">
        <div className="col-lg-6 d-none d-lg-block login-image" style={{ background: "#eef2f6", minHeight: 450 }}></div>
        <div className="col-lg-6 login-form">
          <div className="text-center mb-5">
            <i className="bi bi-shield-lock-fill logo" style={{ fontSize: 48, color: "#0d6efd" }}></i>
            <h1 className="h3 fw-bold">Iniciar Sesión</h1>
            <p className="text-muted">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="form-label fw-medium">Correo electrónico o Usuario</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="correo@ejemplo.com"
                  required
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="password" className="form-label fw-medium">Contraseña</label>
                <a href="#" className="text-decoration-none small" style={{ color: "var(--primary-color)" }}>¿Olvidaste tu contraseña?</a>
              </div>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label" htmlFor="remember">Recordar sesión</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 btn-login" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            <div className="additional-links mt-3 text-center">
              <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
