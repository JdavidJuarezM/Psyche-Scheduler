// path: frontend/src/components/scheduling/Step4_ConfirmDetails.jsx

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clipboard as ClipboardIcon,
  User as UserIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
} from "lucide-react";

export default function Step4_ConfirmDetails({
  selections,
  notes,
  onNotesChange,
}) {
  const { type, prof, date, time } = selections;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        4. Confirma los Detalles
      </h2>
      <div className="bg-slate-800 rounded-lg p-8">
        <div className="border-b border-slate-700 pb-4 mb-4">
          <div className="flex items-center mb-3">
            <ClipboardIcon className="h-5 w-5 text-gray-400" />
            <span className="ml-3 text-gray-400">Tipo de Cita:</span>
            <span className="ml-auto font-semibold text-white">
              {type?.name}
            </span>
          </div>
          <div className="flex items-center mb-3">
            <UserIcon className="h-5 w-5 text-gray-400" />
            <span className="ml-3 text-gray-400">Profesional:</span>
            <span className="ml-auto font-semibold text-white">
              {prof?.name}
            </span>
          </div>
          <div className="flex items-center mb-3">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <span className="ml-3 text-gray-400">Fecha:</span>
            <span className="ml-auto font-semibold text-white">
              {date?.toLocaleDateString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <span className="ml-3 text-gray-400">Hora:</span>
            <span className="ml-auto font-semibold text-white">{time}</span>
          </div>
        </div>
        <div className="mt-4">
          <Label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Notas (Opcional)
          </Label>
          <Textarea
            id="notes"
            rows="3"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Añade cualquier información relevante..."
            className="w-full bg-slate-700 border-slate-600 text-white rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  );
}
