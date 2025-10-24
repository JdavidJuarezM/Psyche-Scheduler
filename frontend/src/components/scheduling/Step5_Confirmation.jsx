// path: frontend/src/components/scheduling/Step5_Confirmation.jsx

import { Button } from "@/components/ui/button";
import { CheckCircle as CheckCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Step5_Confirmation({ selections, onStartNew }) {
  const navigate = useNavigate();
  const { type, prof, date, time } = selections;

  return (
    <div className="bg-slate-800 rounded-lg p-8 text-center flex flex-col items-center">
      <CheckCircleIcon className="text-green-500 w-12 h-12" />
      <h2 className="text-2xl font-bold text-white mt-4 mb-2">
        ¡Cita Agendada con Éxito!
      </h2>
      <p className="text-gray-400 mb-6">
        Hemos enviado una confirmación a tu correo electrónico.
      </p>
      <div className="text-left border-y border-slate-700 py-4 mb-6 w-full max-w-md">
        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Tipo:</span> {type?.name}
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Profesional:</span> {prof?.name}
        </p>
        <p className="text-gray-300">
          <span className="font-semibold">Cuándo:</span>{" "}
          {date?.toLocaleDateString("es-MX", { day: "numeric", month: "long" })}{" "}
          a las {time}
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={onStartNew} variant="secondary">
          Agendar Otra Cita
        </Button>
        <Button onClick={() => navigate("/my-bookings")}>Ir a Mis Citas</Button>
      </div>
    </div>
  );
}
