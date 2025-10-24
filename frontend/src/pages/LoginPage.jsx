// path: frontend/src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/components/LoginForm";
import ParticleCanvas from "@/components/ParticleCanvas";
import bienestar1 from "../assets/bienestar1.jpg";
import gestion1 from "../assets/Gestion1.png";
const panelContent = {
  patient: {
    panelTitle: "Tu camino hacia el bienestar comienza aquí",
    panelSubtitle:
      "Organiza tus sesiones, sigue tu progreso y encuentra el equilibrio que buscas.",
    image: bienestar1,
  },
  psychologist: {
    panelTitle: "Empodera tu Práctica Profesional",
    panelSubtitle:
      "Una herramienta intuitiva para gestionar tus citas, notas y comunicación con pacientes.",
    image: gestion1,
  },
};

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("patient");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex min-h-screen relative">
      <ParticleCanvas className="absolute inset-0 z-0" />

      {/* Panel izquierdo: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 z-10">
        <LoginForm
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </div>

      {/* Panel derecho: Imagen + Texto */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 overflow-hidden">
        <div className="text-center relative">
          {/* Contenedor de flotación */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedRole} // animación de entrada/salida al cambiar rol
                src={panelContent[selectedRole].image}
                alt="Ilustración de bienvenida"
                className="rounded-2xl shadow-2xl w-80 h-80 object-cover mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedRole}-text`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                {panelContent[selectedRole].panelTitle}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {panelContent[selectedRole].panelSubtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
