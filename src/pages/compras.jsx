function Compras({ lista, vaciar }) {
    let subtotal = 0;
    let iva = 0;
    let total = 0;
    
    lista.forEach((producto) => {
        subtotal += producto.precio;
    });

    iva = subtotal * 0.15;
    total = subtotal + iva;

    function nuevaCompra() {
        vaciar();
    }

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Total de productos: {lista.length}</h3>
            
            <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 rounded-3 p-3">
                    <h4>Mis productos seleccionados</h4>

                    <ul>
                        {lista.map((producto, i) => (
                            <li key={i}>
                                {producto.nombre} - ${producto.precio.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-4">
                <h4>Valores</h4>
                <p className="mb-1">Subtotal: ${subtotal.toFixed(2)}</p>
                <p className="mb-1">IVA (15%): ${iva.toFixed(2)}</p>
                <p className="fw-bold text-primary">Total a pagar: ${total.toFixed(2)}</p>

                <button className="btn btn-success" onClick={nuevaCompra}>
                    Nueva Compra
                </button>
            </div>

        </div>
    );
}

export default Compras;