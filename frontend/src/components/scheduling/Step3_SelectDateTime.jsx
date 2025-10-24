// path: frontend/src/components/scheduling/Step3_SelectDateTime.jsx

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { es } from "date-fns/locale";
import { format } from "date-fns";

export default function Step3_SelectDateTime({
  selectedProf,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  availableTimes,
  isLoadingTimes,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">
        3. Elige Fecha y Hora
      </h2>
      <p className="text-gray-400 mb-6">
        Para:{" "}
        <span className="font-semibold text-cyan-400">
          {selectedProf?.name}
        </span>
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-slate-800 p-5 rounded-lg">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            locale={es}
            className="p-0"
            disabled={(date) =>
              date < new Date(new Date().setDate(new Date().getDate() - 1))
            }
          />
        </div>
        <div className="w-full md:w-1/3 bg-slate-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">
            Horas Disponibles
          </h3>
          {isLoadingTimes ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => onSelectTime(time)}
                    className={`time-slot-button p-2 rounded-lg text-sm font-semibold transition-colors bg-slate-700 text-gray-300 ${
                      selectedTime === time ? "selected" : ""
                    }`}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400 col-span-2">
                  No hay horarios disponibles para este día.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
