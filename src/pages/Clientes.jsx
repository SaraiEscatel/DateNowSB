import { useEffect, useState } from "react";
import { supabase } from "../service/supabaseClient";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerClientes();
  }, []);

  async function obtenerClientes() {
    setCargando(true);
    const { data } = await supabase
      .from("clientes")
      .select("*")
      .order("id", { ascending: true });
    if (data) setClientes(data);
    setCargando(false);
  }

  async function agregarCliente(e) {
    e.preventDefault();
    setGuardando(true);
    setMensaje("");

    const { error } = await supabase.from("clientes").insert([
      {
        nombre,
        telefono,
        email: email || null,
      },
    ]);

    if (!error) {
      setNombre("");
      setTelefono("");
      setEmail("");
      setMostrarForm(false);
      setMensaje("Cliente registrado correctamente.");
      obtenerClientes();
    } else {
      alert("Error al registrar el cliente.");
    }
    setGuardando(false);
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#1e293b", fontSize: "24px" }}>
            Directorio de Clientes
          </h2>
          <p style={{ margin: "5px 0 0", color: "#64748b" }}>
            Lista de usuarios vinculados con el asistente de WhatsApp.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {mostrarForm ? "✕ Cancelar" : "+ Registrar Cliente"}
        </button>
      </div>

      {mensaje && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#dcfce7",
            color: "#166534",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {mensaje}
        </div>
      )}

      {/* Formulario Modal / Integrado */}
      {mostrarForm && (
        <form
          onSubmit={agregarCliente}
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <label
              style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}
            >
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px 12px",
                marginTop: "4px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>
          <div>
            <label
              style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}
            >
              Teléfono (WhatsApp)
            </label>
            <input
              type="tel"
              placeholder="+52 33 1234 5678"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px 12px",
                marginTop: "4px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>
          <div>
            <label
              style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="cliente@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                marginTop: "4px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>
          <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
            <button
              type="submit"
              disabled={guardando}
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "9px 20px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {guardando ? "Guardando..." : "Confirmar Registro"}
            </button>
          </div>
        </form>
      )}

      {/* Tabla Profesional */}
      {cargando ? (
        <p style={{ color: "#64748b" }}>Cargando clientes...</p>
      ) : (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                  color: "#475569",
                }}
              >
                <th style={{ padding: "14px 20px" }}>Cliente</th>
                <th style={{ padding: "14px 20px" }}>WhatsApp / Teléfono</th>
                <th style={{ padding: "14px 20px" }}>Correo</th>
                <th style={{ padding: "14px 20px", textAlign: "center" }}>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {c.nombre}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      color: "#2563eb",
                      fontFamily: "monospace",
                      fontSize: "13px",
                    }}
                  >
                    💬 {c.telefono}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#64748b" }}>
                    {c.email || "—"}
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "center" }}>
                    <span
                      style={{
                        backgroundColor: "#f1f5f9",
                        color: "#475569",
                        padding: "3px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Sincronizado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
