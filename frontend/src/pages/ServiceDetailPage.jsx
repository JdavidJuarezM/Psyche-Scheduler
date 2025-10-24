// path: frontend/src/pages/ServiceDetailPage.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState(null);
  const [bookingDate, setBookingDate] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5201/api/services/${id}`
        );
        setService(response.data);
      } catch (err) {
        setError("No se pudo cargar el servicio.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleBooking = async () => {
    if (!token) {
      toast.error("Debes iniciar sesión para poder agendar.");
      navigate("/login");
      return;
    }
    if (!bookingDate) {
      toast.error("Por favor, selecciona una fecha y hora.");
      return;
    }

    setIsBooking(true);
    await toast.promise(
      axios
        .post(
          "http://localhost:5201/api/bookings",
          { serviceId: id, bookingDate: bookingDate },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .finally(() => setIsBooking(false)),
      {
        loading: "Agendando tu sesión...",
        success: () => {
          navigate("/my-bookings");
          return "¡Sesión agendada con éxito!";
        },
        error: (err) => {
          console.error(err);
          return "Error al agendar la sesión.";
        },
      }
    );
  };

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!service)
    return <p className="text-center mt-8">Servicio no encontrado.</p>;

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
        <p className="text-xl text-gray-700 mb-2">{service.description}</p>
        <p className="text-2xl text-gray-800 font-bold mb-6">
          ${service.price}
        </p>

        <div className="mt-6 p-4 border-t">
          <h2 className="text-2xl font-semibold mb-4">Agendar una Sesión</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Input
              type="datetime-local"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
            <Button onClick={handleBooking} disabled={isBooking}>
              {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isBooking ? "Agendando..." : "Agendar Ahora"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
