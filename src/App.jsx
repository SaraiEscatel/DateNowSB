import { useEffect, useState } from "react";
import { supabase } from "./service/supabaseClient";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Servicios from "./pages/Servicios";

import "./App.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [pagina, setPagina] = useState("dashboard");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerSesion();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, session) => {
      setUsuario(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function obtenerSesion() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUsuario(session?.user ?? null);
    setCargando(false);
  }

  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error);
      return;
    }

    setUsuario(null);
    setPagina("dashboard");
  }

  function mostrarPagina() {
    if (pagina === "dashboard") {
      return <Dashboard />;
    }

    if (pagina === "clientes") {
      return <Clientes />;
    }

    if (pagina === "servicios") {
      return <Servicios />;
    }

    return <Dashboard />;
  }

  if (cargando) {
    return (
      <div className="pantalla-carga">
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  if (!usuario) {
    return <Login alIniciarSesion={(usuario) => setUsuario(usuario)} />;
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-logo">
          <h1>DateNow</h1>
        </div>

        <nav className="navbar-menu">
          <button
            className={
              pagina === "dashboard" ? "boton-nav activo" : "boton-nav"
            }
            onClick={() => setPagina("dashboard")}
          >
            Inicio
          </button>

          <button
            className={pagina === "clientes" ? "boton-nav activo" : "boton-nav"}
            onClick={() => setPagina("clientes")}
          >
            Clientes
          </button>

          <button
            className={
              pagina === "servicios" ? "boton-nav activo" : "boton-nav"
            }
            onClick={() => setPagina("servicios")}
          >
            Servicios
          </button>

          <button className="boton-cerrar" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </nav>
      </header>

      <div className="informacion-usuario">
        Sesión iniciada como: <strong>{usuario.email}</strong>
      </div>

      <main className="contenido">{mostrarPagina()}</main>
    </div>
  );
}

export default App;
