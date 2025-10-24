// path: frontend/src/pages/DashboardPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Loader2, Users, Calendar, BarChart2 } from "lucide-react";

// Pequeño componente para las tarjetas de estadísticas
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      // Si no hay token, no es un error, simplemente no cargamos datos de dashboard
      setLoading(false);
      return;
    }

    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5201/api/dashboard/summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSummaryData(response.data);
      } catch (err) {
        setError("No se pudo cargar el resumen del dashboard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  // Si no hay token, mostramos una bienvenida pública
  if (!token) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold my-8">
          Bienvenido a Psyche-Scheduler
        </h1>
        <p className="text-lg text-gray-600">
          Inicia sesión o regístrate para gestionar tus sesiones.
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 text-lg"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  // Si hay token, mostramos el dashboard del psicólogo
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Sección de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Pacientes Totales"
          value={summaryData?.stats?.totalPatients}
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Sesiones este Mes"
          value={summaryData?.stats?.bookingsThisMonth}
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sección de Próximas Sesiones */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Próximas Sesiones</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {summaryData?.upcomingBookings?.length > 0 ? (
              summaryData.upcomingBookings.map((booking) => (
                <div key={booking.id} className="border-b pb-2">
                  <p className="font-semibold">{booking.patientName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.bookingDate).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No tienes próximas sesiones agendadas.</p>
            )}
          </div>
        </div>

        {/* Sección de Pacientes Recientes */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pacientes Recientes</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {summaryData?.recentPatients?.length > 0 ? (
              summaryData.recentPatients.map((patient) => (
                <div key={patient.id} className="border-b pb-2">
                  <p className="font-semibold">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{patient.email}</p>
                </div>
              ))
            ) : (
              <p>No hay pacientes recientes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
