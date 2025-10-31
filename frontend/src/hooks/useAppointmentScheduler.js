// path: frontend/src/hooks/useAppointmentScheduler.js

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function useAppointmentScheduler() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState({ initial: true, times: false });
  const [error, setError] = useState(null);

  const [selectedInfo, setSelectedInfo] = useState({
    type: null,
    prof: null,
    date: new Date(),
    time: null,
    notes: "",
  });

  // Carga de datos inicial
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading({ initial: true, times: false });
      try {
        const [typesResponse, profsResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/services"),
          axios.get("http://localhost:8080/api/professionals"),
        ]);
        setAppointmentTypes(typesResponse.data);
        setProfessionals(profsResponse.data);
      } catch (err) {
        setError("No se pudieron cargar los datos para agendar.");
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };
    fetchInitialData();
  }, []);

  // Carga de disponibilidad
  // CÓDIGO CORREGIDO:
useEffect(() => {
  // Agregamos 'selectedInfo.type' a la condición
  if (selectedInfo.prof && selectedInfo.date && selectedInfo.type) {
    const fetchAvailability = async () => {
      setLoading((prev) => ({ ...prev, times: true }));
      setSelectedInfo((prev) => ({ ...prev, time: null }));
      try {
        const dateString = selectedInfo.date.toISOString().split("T")[0];
        // Agregamos serviceId a la URL
        const response = await axios.get(
          `http://localhost:8080/api/availability/professional/${selectedInfo.prof.id}?serviceId=${selectedInfo.type.id}&date=${dateString}`
        );
        setAvailableTimes(response.data);
      } catch (err) {
        toast.error("No se pudo cargar la disponibilidad para esta fecha.");
      } finally {
        setLoading((prev) => ({ ...prev, times: false }));
      }
    };
    fetchAvailability();
  }
}, [selectedInfo.prof, selectedInfo.date, selectedInfo.type]); // <-- Agregamos 'selectedInfo.type' a las dependencias

  // Manejadores de estado
  const handlers = {
    handleSelectType: (type) => {
      setSelectedInfo((prev) => ({ ...prev, type }));
      setStep(2);
    },
    handleSelectProf: (prof) => {
      setSelectedInfo((prev) => ({ ...prev, prof }));
      setStep(3);
    },
    handleSelectDate: (date) => {
      setSelectedInfo((prev) => ({ ...prev, date }));
    },
    handleSelectTime: (time) => {
      setSelectedInfo((prev) => ({ ...prev, time }));
    },
    handleNotesChange: (notes) => {
      setSelectedInfo((prev) => ({ ...prev, notes }));
    },
    goToNextStep: () => {
      if (step === 3 && selectedInfo.time) setStep(4);
    },
    goToPrevStep: () => {
      if (step === 2) setSelectedInfo((prev) => ({ ...prev, type: null }));
      if (step === 3) setSelectedInfo((prev) => ({ ...prev, prof: null }));
      if (step === 4) setSelectedInfo((prev) => ({ ...prev, time: null }));
      setStep((prev) => prev - 1);
    },
    confirmAppointment: async () => {
      const [hour, minute] = selectedInfo.time.split(":");
      const bookingDateTime = new Date(selectedInfo.date);
      bookingDateTime.setHours(hour, minute, 0, 0);

      await toast.promise(
        axios.post(
          "http://localhost:8080/api/bookings",
          {
            serviceId: selectedInfo.type.id,
            professionalId: selectedInfo.prof.id,
            startTime: bookingDateTime.toISOString()
          },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        {
          loading: "Confirmando tu sesión...",
          success: () => {
            setStep(5);
            return "¡Sesión agendada con éxito!";
          },
          error: "Hubo un error al confirmar tu sesión.",
        }
      );
    },
    startNewAppointment: () => {
      setStep(1);
      setSelectedInfo({
        type: null,
        prof: null,
        date: new Date(),
        time: null,
        notes: "",
      });
    },
  };

  // El hook devuelve todo lo que los componentes de vista necesitarán
  return {
    step,
    loading,
    error,
    data: { appointmentTypes, professionals, availableTimes },
    selections: selectedInfo,
    handlers,
  };
}
