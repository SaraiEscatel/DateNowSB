import { useEffect, useState } from "react";
import { supabase } from "../service/supabaseClient";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState(30);
  const [precio, setPrecio] = useState(100);

  useEffect(() => {
    cargarServicios();
  }, []);

  async function cargarServicios() {
    const { data } = await supabase.from("servicios").select("*");
    if (data) setServicios(data);
  }

  async function agregarServicio(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("servicios")
      .insert([
        {
          nombre,
          descripcion,
          duracion_minutos: parseInt(duracion),
          precio: parseFloat(precio),
        },
      ]);

    if (!error) {
      setNombre("");
      setDescripcion("");
      cargarServicios();
    } else {
      alert("Error al guardar el servicio");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Servicios</h2>

      {/* Formulario de registro */}
      <form
        onSubmit={agregarServicio}
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Nombre Servicio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duración (min)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio ($)"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit">Agregar Servicio</button>
      </form>

      {/* Tabla de servicios */}
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Duración</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.nombre}</td>
              <td>{s.descripcion}</td>
              <td>{s.duracion_minutos} min</td>
              <td>${s.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
