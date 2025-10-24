// path: frontend/src/components/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
