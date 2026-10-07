import { useEffect, useState } from "react";
import { supabase } from "../service/supabaseClient";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerClientes();
  }, []);

  async function obtenerClientes() {
    setCargando(true);
    setError("");

    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al obtener clientes:", error);

      setError("No se pudieron obtener los clientes.");

      setCargando(false);
      return;
    }

    setClientes(data || []);
    setCargando(false);
  }

  async function agregarCliente(e) {
    e.preventDefault();

    setMensaje("");
    setError("");
    setGuardando(true);

    const { error } = await supabase.from("clientes").insert([
      {
        nombre: nombre,
        telefono: telefono,
        correo: correo || null,
      },
    ]);

    if (error) {
      console.error("Error al registrar cliente:", error);

      setError("No se pudo registrar el cliente.");

      setGuardando(false);
      return;
    }

    setNombre("");
    setTelefono("");
    setCorreo("");

    setMensaje("Cliente registrado correctamente.");

    await obtenerClientes();

    setGuardando(false);
  }

  return (
    <div>
      <div className="titulo-pagina">
        <h2>Clientes</h2>

        <p>Administración de los clientes registrados.</p>
      </div>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      {error && <div className="mensaje-error">{error}</div>}

      <section className="seccion">
        <h3>Registrar cliente</h3>

        <form onSubmit={agregarCliente} className="formulario">
          <div className="campo">
            <label htmlFor="nombre-cliente">Nombre completo</label>

            <input
              id="nombre-cliente"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del cliente"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="telefono-cliente">Teléfono</label>

            <input
              id="telefono-cliente"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Número de teléfono"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="correo-cliente">Correo electrónico</label>

            <input
              id="correo-cliente"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <button
            type="submit"
            className="boton-principal"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Registrar cliente"}
          </button>
        </form>
      </section>

      <section className="seccion">
        <h3>Clientes registrados</h3>

        {cargando ? (
          <p>Cargando clientes...</p>
        ) : clientes.length === 0 ? (
          <p>No hay clientes registrados.</p>
        ) : (
          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                </tr>
              </thead>

              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nombre}</td>

                    <td>{cliente.telefono}</td>

                    <td>{cliente.correo || "No registrado"}</td>
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

export default Clientes;
