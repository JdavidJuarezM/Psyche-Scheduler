// path: frontend/src/pages/CreateServicePage.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Usaremos un Textarea para la descripción
import { Loader2 } from "lucide-react";

export default function CreateServicePage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Primero, añadimos el componente Textarea de Shadcn
  // En tu terminal (en la carpeta frontend), ejecuta:
  // npx shadcn@latest add textarea

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await toast.promise(
      axios
        .post("http://localhost:5201/api/services", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .finally(() => setIsLoading(false)),
      {
        loading: "Guardando servicio...",
        success: () => {
          navigate("/"); // Redirige a la página de inicio para ver el nuevo servicio
          return "¡Servicio creado con éxito!";
        },
        error: (err) => {
          console.error("Error creating service:", err);
          return "Error al crear el servicio.";
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Crear Nuevo Servicio de Terapia
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Nombre del Servicio</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Ej: Terapia Individual"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe el servicio..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="price">Precio (MXN)</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="Ej: 800"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Guardando..." : "Crear Servicio"}
          </Button>
        </form>
      </div>
    </div>
  );
}
