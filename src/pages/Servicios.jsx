import { useEffect, useState } from "react";
import { supabase } from "../service/supabaseClient";

function Servicios() {
  const [servicios, setServicios] = useState([]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerServicios();
  }, []);

  async function obtenerServicios() {
    setCargando(true);
    setError("");

    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al obtener servicios:", error);

      setError("No se pudieron obtener los servicios.");

      setCargando(false);
      return;
    }

    setServicios(data || []);
    setCargando(false);
  }

  async function agregarServicio(e) {
    e.preventDefault();

    setMensaje("");
    setError("");
    setGuardando(true);

    const { error } = await supabase.from("servicios").insert([
      {
        nombre: nombre,
        precio: Number(precio),
        duracion_minutos: Number(duracion),
      },
    ]);

    if (error) {
      console.error("Error al registrar servicio:", error);

      setError("No se pudo registrar el servicio.");

      setGuardando(false);
      return;
    }

    setNombre("");
    setPrecio("");
    setDuracion("");

    setMensaje("Servicio registrado correctamente.");

    await obtenerServicios();

    setGuardando(false);
  }

  async function eliminarServicio(id) {
    const confirmar = window.confirm("¿Deseas eliminar este servicio?");

    if (!confirmar) {
      return;
    }

    setMensaje("");
    setError("");

    const { error } = await supabase.from("servicios").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar servicio:", error);

      setError("No se pudo eliminar el servicio.");

      return;
    }

    setMensaje("Servicio eliminado correctamente.");

    await obtenerServicios();
  }

  return (
    <div>
      <div className="titulo-pagina">
        <h2>Servicios</h2>

        <p>Administra los servicios disponibles para las citas.</p>
      </div>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      {error && <div className="mensaje-error">{error}</div>}

      <section className="seccion">
        <h3>Registrar servicio</h3>

        <form onSubmit={agregarServicio} className="formulario">
          <div className="campo">
            <label htmlFor="nombre-servicio">Nombre del servicio</label>

            <input
              id="nombre-servicio"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ejemplo: Corte de cabello"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="precio-servicio">Precio</label>

            <input
              id="precio-servicio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Ejemplo: 150"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="duracion-servicio">Duración en minutos</label>

            <input
              id="duracion-servicio"
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              placeholder="Ejemplo: 60"
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="boton-principal"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Registrar servicio"}
          </button>
        </form>
      </section>

      <section className="seccion">
        <h3>Servicios registrados</h3>

        {cargando ? (
          <p>Cargando servicios...</p>
        ) : servicios.length === 0 ? (
          <p>No hay servicios registrados.</p>
        ) : (
          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Duración</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {servicios.map((servicio) => (
                  <tr key={servicio.id}>
                    <td>{servicio.nombre}</td>

                    <td>${Number(servicio.precio).toFixed(2)}</td>

                    <td>{servicio.duracion_minutos} min</td>

                    <td>
                      <button
                        className="boton-eliminar"
                        onClick={() => eliminarServicio(servicio.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Servicios;
