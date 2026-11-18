import { Link } from 'react-router-dom';

function Encabezado({ titulo }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {titulo || "Tienda PUCE Ibarra"}
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Inicio</Link>
            <Link className="nav-link" to="/productos">Productos</Link>
            <Link className="nav-link" to="/contacto">Contacto</Link>
            <Link className="nav-link" to="/compras">Compra en Línea</Link>
            <Link className="nav-link" to="/Catalogoweb">Catalogo web</Link>
            <Link className="nav-link" to="/Ofertas">Ofertas</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Encabezado;