// path: frontend/src/App.jsx

import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import MyBookingsPage from "./pages/MyBookingsPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CreateServicePage from "./pages/CreateServicePage";
import DashboardPage from "./pages/DashboardPage";
import PatientDashboardLayout from "./components/PatientDashboardLayout";
import ScheduleAppointmentPage from "./pages/ScheduleAppointmentPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Rutas Públicas */}
        <Route path="/" element={<DashboardPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- Rutas Protegidas del Dashboard del Psicólogo --- */}
        <Route
          path="/services/create"
          element={
            <ProtectedRoute>
              <CreateServicePage />
            </ProtectedRoute>
          }
        />
        {/* --- Ruta para el nuevo asistente de agendamiento --- */}
        {/* vvv 2. ESTRUCTURA DE RUTAS ANIDADAS PARA EL PACIENTE vvv */}
        <Route
          element={
            <ProtectedRoute>
              <PatientDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <ScheduleAppointmentPage />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          {/* Si en el futuro creamos más páginas para el paciente, las añadiremos aquí */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
