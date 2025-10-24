// path: frontend/src/context/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; // <-- 1. Importa jwt-decode

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // 2. Nuevo estado para guardar la información del usuario (incluyendo el rol)
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token); // Decodifica el token
      // El rol está en una URL larga, la extraemos
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      setUser({ ...decodedToken, role }); // Guarda la información del usuario y el rol
    } else {
      localStorage.removeItem("token");
      setUser(null); // Limpia el usuario si no hay token
    }
  }, [token]);

  const login = async (formData) => {
    await toast.promise(
      axios.post("http://localhost:5201/api/users/login", formData),
      {
        loading: "Iniciando sesión...",
        success: (response) => {
          setToken(response.data.token);
          // La redirección ahora puede depender del rol, pero por ahora lo dejamos simple
          navigate("/profile");
          return "¡Bienvenido de nuevo!";
        },
        error: (err) => {
          console.error("Error during login:", err);
          return "Error en el login. Revisa tus credenciales.";
        },
      }
    );
  };

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  // 3. Expone el 'user' en el valor del contexto
  const value = { token, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
