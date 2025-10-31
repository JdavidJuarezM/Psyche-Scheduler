// path: frontend/src/pages/RegisterPage.jsx

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Loader2, User, Mail, Lock } from "lucide-react"; // <-- 1. IMPORTA los íconos

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "PATIENT",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await toast.promise(
      axios
        .post("http://localhost:8080/api/auth/register", formData)
        .finally(() => setIsLoading(false)),
      {
        loading: "Registrando usuario...",
        success: (response) => {
          console.log("User registered successfully:", response.data);
          navigate("/login");
          return "¡Usuario registrado con éxito!";
        },
        error: (err) => {
          console.error("There was an error registering the user:", err);
          return "Error al registrar el usuario.";
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Crear una Cuenta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* vvv 2. ESTRUCTURA MODIFICADA PARA LOS CAMPOS vvv */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="firstName">Nombre:</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Tu nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lastName">Apellido:</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Tus apellidos"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email:</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Contraseña:</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Procesando..." : "Registrar"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
