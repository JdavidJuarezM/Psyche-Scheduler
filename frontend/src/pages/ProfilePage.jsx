// path: frontend/src/pages/ProfilePage.jsx

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import EditProfileModal from "@/components/EditProfileModal";
import {
  Loader2,
  Pencil,
  AlertTriangle,
  UserCircle,
  Shield,
  Calendar as CalendarIcon,
  Users as GenderIcon,
  Mail,
  Phone,
} from "lucide-react";

// --- Sub-componente para el panel de progreso ---
const ProgressPanel = () => {
  const stats = {
    sessionsThisMonth: 4,
    habitStreak: 12,
    wellBeing: 75,
  };

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Mi Progreso
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Sesiones este Mes
          </p>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {stats.sessionsThisMonth}
          </p>
        </div>
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Racha de Registros
          </p>
          <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-1">
            {stats.habitStreak} <span className="text-lg">días</span>
          </p>
        </div>
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Bienestar General
          </p>
          <p className="text-4xl font-bold text-amber-500 dark:text-amber-400 mt-1">
            {stats.wellBeing}%
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Sub-componente para la alerta de perfil incompleto ---
const ProfileCompletionAlert = ({ onEditClick, progress }) => (
  <div className="bg-amber-50 dark:bg-amber-900/50 border-l-4 border-amber-400 p-4 rounded-lg mb-8">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
          ¡Completa tu perfil para una mejor experiencia!
        </p>
        <div className="mt-2">
          <div className="w-full bg-amber-100 dark:bg-amber-800 rounded-full h-2.5">
            <div
              className="bg-amber-400 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 text-right">
            {progress}% completado
          </p>
        </div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onEditClick();
          }}
          className="text-sm font-semibold text-blue-600 dark:text-blue-300 hover:underline mt-1 inline-block"
        >
          Añadir datos faltantes
        </a>
      </div>
    </div>
  </div>
);

// --- Sub-componente para cada campo del perfil ---
const ProfileField = ({ icon, label, value, onEditClick }) => (
  <div
    className={`flex items-start space-x-3 ${
      !value ? "p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg" : ""
    }`}
  >
    {icon}
    <div>
      <p
        className={`text-sm ${
          !value
            ? "text-blue-600 dark:text-blue-300"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-medium text-lg ${
          !value
            ? "text-blue-800 dark:text-blue-200"
            : "text-slate-800 dark:text-white"
        }`}
      >
        {value || "Pendiente por completar"}
      </p>
      {!value && onEditClick && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onEditClick();
          }}
          className="text-sm font-semibold text-blue-600 dark:text-blue-300 hover:underline mt-1 inline-block"
        >
          Añadir
        </a>
      )}
    </div>
  </div>
);

// --- Componente Principal de la Página de Perfil ---
export default function ProfilePage() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    if (!loading) setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/patients/my-profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
    } catch (err) {
      setError("No se pudo cargar la información del perfil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!profile)
    return (
      <p className="text-center mt-8">
        No se encontró el perfil. Intenta iniciar sesión de nuevo.
      </p>
    );

  const profileFields = [
    profile.dateOfBirth,
    profile.gender,
    profile.phoneNumber,
  ];
  const completedFields = profileFields.filter(Boolean).length;
  const progressPercentage = Math.round(
    (completedFields / profileFields.length) * 100
  );
  const isProfileIncomplete = progressPercentage < 100;

  return (
    <>
      <div className="lg:col-span-2 space-y-8">
        <ProgressPanel />

        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                Mi Perfil
              </h1>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 sm:mt-0 transform hover:scale-105"
              >
                <Pencil className="mr-2 h-4 w-4" /> Editar Perfil
              </Button>
            </div>

            {isProfileIncomplete && (
              <ProfileCompletionAlert
                onEditClick={() => setIsModalOpen(true)}
                progress={progressPercentage}
              />
            )}

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
                Información Personal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <ProfileField
                  icon={<UserCircle className="w-6 h-6 text-slate-400 mt-1" />}
                  label="Nombre Completo"
                  value={`${profile.firstName} ${profile.lastName}`}
                />
                <ProfileField
                  icon={<Shield className="w-6 h-6 text-slate-400 mt-1" />}
                  label="Tipo de Usuario"
                  value={profile.role}
                />
                <ProfileField
                  icon={
                    <CalendarIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-1" />
                  }
                  label="Fecha de Nacimiento"
                  value={
                    profile.dateOfBirth
                      ? new Date(profile.dateOfBirth).toLocaleDateString()
                      : null
                  }
                  onEditClick={() => setIsModalOpen(true)}
                />
                <ProfileField
                  icon={
                    <GenderIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-1" />
                  }
                  label="Género"
                  value={profile.gender}
                  onEditClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
                Datos de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <ProfileField
                  icon={<Mail className="w-6 h-6 text-slate-400 mt-1" />}
                  label="Email"
                  value={profile.email}
                />
                <ProfileField
                  icon={<Phone className="w-6 h-6 text-slate-400 mt-1" />}
                  label="Teléfono"
                  value={profile.phoneNumber}
                  onEditClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {profile && (
        <EditProfileModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          profileData={profile}
          onProfileUpdate={fetchProfile}
        />
      )}
    </>
  );
}
