import { useEffect, useState } from "react";
import { supabase } from "./service/supabaseClient";

function App() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerServicios() {
      // Consulta directamente a la tabla 'servicios'
      const { data, error } = await supabase.from("servicios").select("*");

      if (error) {
        console.error("Error al obtener servicios:", error);
      } else {
        setServicios(data);
      }
      setCargando(false);
    }

    obtenerServicios();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Panel de Administración - Citas</h1>
      <h2>Catálogo de Servicios</h2>

      {cargando ? (
        <p>Cargando datos de la base de datos...</p>
      ) : (
        <ul>
          {servicios.map((s) => (
            <li key={s.id}>
              <strong>{s.nombre}</strong> - ${s.precio} ({s.duracion_minutos}{" "}
              min)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
