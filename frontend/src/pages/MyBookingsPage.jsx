// path: frontend/src/pages/MyBookingsPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function MyBookingsPage() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay token, dejamos de cargar y salimos de la función.
    if (!token) {
      setLoading(false); // <-- ESTE ES EL CAMBIO CLAVE
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5201/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (err) {
        setError("No se pudieron cargar tus reservas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading)
    return <p className="text-center mt-8">Cargando tus reservas...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mis Reservas</h1>
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">
                {booking.restaurantName}
              </h2>
              <p className="text-gray-600">
                Fecha: {new Date(booking.bookingDate).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>Aún no has hecho ninguna reserva.</p>
        )}
      </div>
    </div>
  );
}
