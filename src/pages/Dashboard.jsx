function Dashboard() {
  return (
    <div>
      <div className="titulo-pagina">
        <h2>Panel de administración</h2>

        <p>Bienvenido al sistema de gestión de citas Veebo.</p>
      </div>

      <div className="dashboard-grid">
        <div className="tarjeta-dashboard">
          <h3>Clientes</h3>

          <p>Registra y consulta la información de los clientes del negocio.</p>
        </div>

        <div className="tarjeta-dashboard">
          <h3>Servicios</h3>

          <p>Administra los servicios disponibles, precios y duración.</p>
        </div>

        <div className="tarjeta-dashboard">
          <h3>Citas</h3>

          <p>Consulta y administra las citas programadas.</p>

          <span className="estado-pendiente">Próximamente</span>
        </div>

        <div className="tarjeta-dashboard">
          <h3>Horarios</h3>

          <p>Configura los días y horarios de atención.</p>

          <span className="estado-pendiente">Próximamente</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
