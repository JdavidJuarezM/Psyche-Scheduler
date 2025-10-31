// path: frontend/src/context/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);

      // --- VERIFICACIÓN ---
      // Imprime el token decodificado para ver las claves reales
      console.log("Decoded Token:", decodedToken);

      // Es probable que la clave del rol sea 'roles' o 'authorities'
      // Ajusta la siguiente línea según lo que veas en la consola.
      const role = decodedToken.roles ? decodedToken.roles[0] : null;

      setUser({ ...decodedToken, role });
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

const login = async (formData) => {
    await toast.promise(
       axios.post("http://localhost:8080/api/auth/login", formData),
      {
        loading: "Iniciando sesión...",
        success: (response) => {
          setToken(response.data.token);
          const decodedToken = jwtDecode(response.data.token);
          const role = decodedToken.roles ? decodedToken.roles[0] : null;
          if (role === "ROLE_PROFESSIONAL") {
            navigate("/services/create");
          } else {
            navigate("/profile");
          }
          return "¡Bienvenido de nuevo!";
        },
        error: (err) => {
          console.error("Error during login:", err);
          if (err.response && err.response.data && err.response.data.message) {
            return err.response.data.message;
          }
          return "Error en el login. Revisa tus credenciales o inténtalo más tarde.";
        },
      }
    );
  };

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  const value = { token, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
