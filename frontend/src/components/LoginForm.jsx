// path: frontend/src/components/LoginForm.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Contenido dinámico para cada rol
const formContent = {
  patient: {
    welcome: "Bienvenido de Nuevo",
    subtitle: "Nos alegra verte otra vez. Inicia sesión para continuar.",
  },
  psychologist: {
    welcome: "Acceso para Profesionales",
    subtitle: "Inicia sesión para gestionar tu agenda y pacientes.",
  },
};

export default function LoginForm({ selectedRole, setSelectedRole }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData);
    } catch (error) {
      // El toast de error ya se maneja en el AuthContext
      console.error("Login failed from form component", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-2xl glass-panel">
      <div
        className="flex justify-between items-center mb-10 form-element"
        style={{ animationDelay: "100ms" }}
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Psyche-Scheduler
        </h2>
        {/* El interruptor de modo oscuro se controla desde el Header principal */}
      </div>

      {/* Selector de Rol Interactivo */}
      <div className="mb-8 form-element" style={{ animationDelay: "200ms" }}>
        <div className="relative flex p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl w-full">
          <button
            onClick={() => setSelectedRole("patient")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${
              selectedRole === "patient"
                ? "text-indigo-700 dark:text-white"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Paciente
          </button>
          <button
            onClick={() => setSelectedRole("psychologist")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${
              selectedRole === "psychologist"
                ? "text-indigo-700 dark:text-white"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Psicólogo
          </button>
          <div
            className="absolute top-1 left-1 h-[calc(100%-8px)] w-1/2 bg-white dark:bg-slate-700 rounded-lg shadow-md transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(${
                selectedRole === "patient" ? "0%" : "100%"
              })`,
            }}
          ></div>
        </div>
      </div>

      <h1
        className="text-3xl font-bold text-slate-900 dark:text-white form-element"
        style={{ animationDelay: "300ms" }}
      >
        {formContent[selectedRole].welcome}
      </h1>
      <p
        className="mt-2 text-slate-500 dark:text-slate-400 form-element"
        style={{ animationDelay: "400ms" }}
      >
        {formContent[selectedRole].subtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="form-element" style={{ animationDelay: "500ms" }}>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </Label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="pl-10 h-11"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-element" style={{ animationDelay: "600ms" }}>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Contraseña
          </Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="pl-10 pr-10 h-11"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="form-element" style={{ animationDelay: "800ms" }}>
          <Button
            type="submit"
            className="w-full py-3 h-auto text-sm font-semibold shadow-lg bg-indigo-600 hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Iniciar Sesión
          </Button>
        </div>
      </form>

      <p
        className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 form-element"
        style={{ animationDelay: "900ms" }}
      >
        ¿No tienes una cuenta?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
