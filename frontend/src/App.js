import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";


import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import Login from "./pages/login";
import Register from './pages/register';
import Footer from './components/Footer';
import Nosotros from './pages/Nosotros';
import Red from './pages/Red';
import Contacto from './pages/Contacto';
import Servicios from './pages/Servicios';
import ServicioPersona from './pages/ServicioPersona';
import ServicioEvento from './pages/ServicioEvento';
import ListaDoctores from './pages/ListaDoctores';
import Reclamos from './pages/Reclamos';
import Reserva from "./pages/Reserva";
import Citas from "./pages/Citas";
import ProtectedRoute from "./components/ProtectedRoute";
import CitasMedico from "./pages/CitasMedico";
import PacientesAdmin from "./pages/PacientesAdmin";
import HistorialReclamosAdmin from "./pages/HistorialReclamosAdmin";
import HistorialCitasAdmin from './pages/HistorialCitasAdmin';
import HorariosDoctoresSemana from './pages/HorariosDoctoresSemana';
import MedicosAdmin from './pages/MedicosAdmin';
// ...

function AppRoutes() {
  const location = useLocation();
  // Ocultar header y footer en la ruta de admin pacientes
  const hideHeaderFooter = ["/admin/pacientes", "/admin/reclamos", "/admin/citas","/admin/horarios", "/admin/doctores"].includes(location.pathname);


  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/red" element={<Red />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicio-persona" element={<ServicioPersona />} />
        <Route path="/servicio-evento" element={<ServicioEvento />} />
        <Route path="/medicos" element={<ListaDoctores />} />
        <Route path="/reclamos" element={<Reclamos />} />
        <Route path="/reserva" element={<ProtectedRoute><Reserva /></ProtectedRoute>} />
        <Route path="/citas" element={<ProtectedRoute><Citas /></ProtectedRoute>} />
        <Route path="/citas-medico" element={<CitasMedico />} />
        <Route path="/admin/pacientes" element={<PacientesAdmin />} />
        <Route path="/admin/reclamos" element={<HistorialReclamosAdmin />} />
        <Route path="/admin/citas" element={<HistorialCitasAdmin />} />
        <Route path="/admin/horarios" element={<HorariosDoctoresSemana />} />
        <Route path="/admin/doctores" element={<MedicosAdmin />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

// El componente App principal SÓLO tiene el BrowserRouter y envuelve AppRoutes:
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;