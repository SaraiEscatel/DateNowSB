import { useState } from "react";
import { supabase } from "../service/supabaseClient";

function Login({ alIniciarSesion }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function iniciarSesion(e) {
    e.preventDefault();

    setError("");
    setCargando(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    if (error) {
      console.error("Error al iniciar sesión:", error);

      setError("No se pudo iniciar sesión. Verifica tu correo y contraseña.");

      setCargando(false);
      return;
    }

    alIniciarSesion(data.user);

    setCargando(false);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Veebo</h1>
          <p>Administración de citas</p>
        </div>

        <h2>Iniciar sesión</h2>

        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>

            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="contrasena">Contraseña</label>

            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          {error && <div className="mensaje-error">{error}</div>}

          <button type="submit" className="boton-principal" disabled={cargando}>
            {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
