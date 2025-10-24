// path: frontend/src/components/scheduling/Step1_SelectType.jsx

import { Loader2, Clipboard as ClipboardIcon } from "lucide-react";

export default function Step1_SelectType({
  appointmentTypes,
  onSelectType,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        1. Selecciona el Tipo de Sesión
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {appointmentTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onSelectType(type)}
            className="bg-slate-800 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-slate-700 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
          >
            <ClipboardIcon className="h-10 w-10 text-cyan-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              {type.name}
            </h3>
            <p className="text-gray-400 text-sm flex-grow">
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
