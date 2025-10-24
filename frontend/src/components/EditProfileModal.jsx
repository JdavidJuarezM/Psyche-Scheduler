// path: frontend/src/components/EditProfileModal.jsx

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function EditProfileModal({
  isOpen,
  setIsOpen,
  profileData,
  onProfileUpdate,
}) {
  const [formData, setFormData] = useState(profileData);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const initialData = {
      ...profileData,
      dateOfBirth: profileData?.dateOfBirth
        ? new Date(profileData.dateOfBirth)
        : null,
    };
    setFormData(initialData);
  }, [profileData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    if (date && date > new Date()) {
      toast.error("La fecha de nacimiento no puede ser futura");
      return;
    }
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await toast.promise(
      axios
        .put("http://localhost:5201/api/users/profile", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .finally(() => setIsLoading(false)),
      {
        loading: "Actualizando perfil...",
        success: () => {
          onProfileUpdate();
          setIsOpen(false);
          return "¡Perfil actualizado con éxito!";
        },
        error: "Error al actualizar el perfil.",
      }
    );
  };

  // vvv LÓGICA DE COMPARACIÓN CORREGIDA Y MÁS ROBUSTA vvv
  // Función de ayuda para convertir cualquier valor de fecha a un string comparable (o null)
  const getComparableDate = (dateValue) => {
    if (!dateValue) return null;
    // Si ya es un objeto Date, lo convierte. Si es un string, primero crea un objeto Date.
    const dateObj = dateValue instanceof Date ? dateValue : new Date(dateValue);
    // Verifica si la fecha es válida antes de convertirla
    return !isNaN(dateObj.getTime()) ? dateObj.toISOString() : null;
  };

  const isChanged =
    JSON.stringify({
      ...profileData,
      dateOfBirth: getComparableDate(profileData?.dateOfBirth),
    }) !==
    JSON.stringify({
      ...formData,
      dateOfBirth: getComparableDate(formData?.dateOfBirth),
    });
  // ^^^ FIN DE LA LÓGICA CORREGIDA ^^^

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Realiza cambios en tu perfil aquí. Haz clic en guardar cuando
            termines.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Teléfono
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateOfBirth" className="text-right">
              Fecha Nac.
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !formData.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateOfBirth ? (
                    format(formData.dateOfBirth, "PPP", { locale: es })
                  ) : (
                    <span>Elige una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={handleDateChange}
                  initialFocus
                  locale={es}
                  captionLayout="dropdown-buttons"
                  fromYear={1930}
                  toYear={new Date().getFullYear()}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Género
            </Label>
            <Select value={formData.gender} onValueChange={handleGenderChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona tu género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Femenino">Femenino</SelectItem>
                <SelectItem value="No binario">No binario</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
                <SelectItem value="Prefiero no decirlo">
                  Prefiero no decirlo
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading || !isChanged}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
