// path: frontend/src/components/scheduling/Step2_SelectProfessional.jsx

import { Button } from "@/components/ui/button";

export default function Step2_SelectProfessional({
  professionals,
  onSelectProf,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        2. Selecciona un Profesional
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {professionals.map((prof) => (
          <div
            key={prof.id}
            className="bg-slate-800 rounded-lg p-5 flex flex-col items-center text-center transition-all duration-300 hover:bg-slate-700 hover:shadow-lg"
          >
            <img
              src={
                prof.avatarUrl ||
                `https://placehold.co/100x100/7c8eac/ffffff?text=${prof.name.charAt(
                  0
                )}`
              }
              alt={prof.name}
              className="w-24 h-24 rounded-full mb-4 border-4 border-slate-700"
            />
            <h3 className="text-lg font-semibold text-white">{prof.name}</h3>
            <p className="text-cyan-400 text-sm mb-3">{prof.specialty}</p>
            <p className="text-gray-400 text-xs flex-grow mb-4">{prof.bio}</p>
            <Button
              onClick={() => onSelectProf(prof)}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              Seleccionar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
