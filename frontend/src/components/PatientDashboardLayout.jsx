// path: frontend/src/components/PatientDashboardLayout.jsx

import { Outlet, Link } from "react-router-dom";
import { CalendarPlus, MessageSquare, FileText } from "lucide-react"; // <-- 1. Importa los íconos

// Sub-componente para la barra lateral
const QuickAccess = () => (
  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
      Accesos Rápidos
    </h2>
    <div className="space-y-4">
      {/* vvv ENLACE CORREGIDO vvv */}
      <Link
        to="/schedule"
        className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
      >
        <CalendarPlus className="w-6 h-6 text-blue-500" />
        <span className="font-medium text-slate-700 dark:text-slate-200">
          Agendar nueva cita
        </span>
      </Link>

      {/* vvv ENLACE CORREGIDO vvv */}
      <Link
        to="/my-bookings"
        className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
      >
        <MessageSquare className="w-6 h-6 text-purple-500" />
        <span className="font-medium text-slate-700 dark:text-slate-200">
          Gestionar mis citas
        </span>
      </Link>

      {/* Este enlace se queda como ejemplo por ahora */}
      <a
        href="#"
        className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
      >
        <FileText className="w-6 h-6 text-green-500" />
        <span className="font-medium text-slate-700 dark:text-slate-200">
          Mis documentos
        </span>
      </a>
    </div>
  </div>
);

export default function PatientDashboardLayout() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Principal: Aquí se renderizarán las páginas anidadas como el Perfil */}
        <div className="lg:col-span-2 space-y-8">
          <Outlet />
        </div>

        {/* Columna Lateral */}
        <aside className="lg:col-span-1 space-y-8">
          <QuickAccess />
          {/* Aquí podríamos añadir el panel de notificaciones en el futuro */}
        </aside>
      </div>
    </main>
  );
}
