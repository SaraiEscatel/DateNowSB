import { useEffect, useState } from "react";
import { supabase } from "../service/supabaseClient";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState(30);
  const [precio, setPrecio] = useState(150);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    cargarServicios();
  }, []);

  async function cargarServicios() {
    setCargando(true);
    const { data } = await supabase
      .from("servicios")
      .select("*")
      .order("id", { ascending: true });
    if (data) setServicios(data);
    setCargando(false);
  }

  async function agregarServicio(e) {
    e.preventDefault();
    setGuardando(true);
    const { error } = await supabase.from("servicios").insert([
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
      setMostrarForm(false);
      cargarServicios();
    } else {
      alert("Error al guardar el servicio");
    }
    setGuardando(false);
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Encabezado */}
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
            Catálogo de Servicios
          </h2>
          <p style={{ margin: "5px 0 0", color: "#64748b" }}>
            Gestiona la oferta de servicios, sus precios y tiempos de atención.
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
            boxShadow: "0 2px 4px rgba(37,99,235,0.2)",
          }}
        >
          {mostrarForm ? "✕ Cancelar" : "+ Nuevo Servicio"}
        </button>
      </div>

      {/* Formulario desplegable */}
      {mostrarForm && (
        <form
          onSubmit={agregarServicio}
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <label
              style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}
            >
              Nombre del Servicio
            </label>
            <input
              type="text"
              placeholder="Ej. Corte Caballero"
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
              Duración (minutos)
            </label>
            <input
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
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
              Precio ($)
            </label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
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
          <div style={{ gridColumn: "1 / -1" }}>
            <label
              style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}
            >
              Descripción
            </label>
            <input
              type="text"
              placeholder="Detalle breve del servicio..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
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
              {guardando ? "Guardando..." : "Guardar Servicio"}
            </button>
          </div>
        </form>
      )}

      {/* Grid de Servicios (Cards) */}
      {cargando ? (
        <p style={{ color: "#64748b" }}>Cargando catálogo...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {servicios.map((s) => (
            <div
              key={s.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#0f172a", fontSize: "18px" }}>
                    {s.nombre}
                  </h3>
                  <span
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#15803d",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Activo
                  </span>
                </div>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "10px 0 15px",
                    minHeight: "40px",
                  }}
                >
                  {s.descripcion || "Sin descripción asignada."}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#475569",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  ⏱ {s.duracion_minutos} min
                </span>
                <span
                  style={{
                    color: "#2563eb",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  ${s.precio}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
