// path: frontend/src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Bell, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-slate-800 dark:text-white"
          >
            Psyche-Scheduler
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <label
                htmlFor="theme-toggle"
                className="relative inline-flex items-center cursor-pointer mx-2"
              >
                <input
                  type="checkbox"
                  id="theme-toggle"
                  className="sr-only peer"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            {user && (
              <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={`https://placehold.co/100x100/cae9ff/1b4965?text=${
                      user.email?.charAt(0).toUpperCase() || "U"
                    }`}
                    alt="Avatar"
                  />
                  <span className="hidden md:inline font-medium text-slate-700 dark:text-slate-200">
                    {user.email}
                  </span>
                </Link>
                <Button onClick={logout} variant="destructive" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Registro</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
