import React, { useState } from 'react';

function CardProducto({ nombre, precio, disponible, stock, agregar, onAgregarAlCarrito, imagen }) {
    const [descuento, setDescuento] = useState(0);

    let iva = precio * 0.15;
    let precioConIva = precio + iva;
    let totalUnitarioConDescuento = precioConIva - (precioConIva * (descuento / 100));

    function agregarProducto() {
        agregar(nombre, precio);
        //console.log(`Producto agregado: ${nombre}, Precio: ${precio}`);
    }

    let colorstock;
    if (stock > 10) {
        colorstock = 'bg-success';
    } else if (stock < 5) {
        colorstock = 'bg-warning text-dark';
    } else {
        colorstock = 'bg-danger';
    }
    

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 p-2">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-dark">{nombre}</h5>
                <img src={imagen} alt={nombre} className="card-img-top mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />  
                <p className="card-text mb-1 text-muted small">Precio unitario: ${precio.toFixed(2)}</p>
                <p className="card-text mb-1 text-muted small">IVA (15%): ${iva.toFixed(2)}</p>
                <p className="card-text fw-bold text-primary mb-2">Total c/IVA: ${precioConIva.toFixed(2)}</p>

                <div className="mb-3 d-flex gap-1 flex-wrap">
                    <span className={`badge ${disponible ? 'bg-success' : 'bg-danger'}`}>
                        {disponible ? 'Disponible' : 'No disponible'}
                    </span>
                    <span className={`badge ${colorstock}`}>
                        {stock > 10 ? `Stock (${stock})` : stock < 5 ? 'Poco stock' : 'Stock bajo'}
                    </span>
                </div>

                <div className="bg-light p-3 rounded-3 mt-auto">
                    <label className="form-label small fw-bold text-secondary mb-1">Descuento (%)</label>
                    <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        className="form-control form-control-sm mb-2" 
                        placeholder="Ej. 10"  
                        value={descuento === 0 ? '' : descuento}
                        onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)} 
                    /> 
                    <p className="small text-success fw-bold mb-2"> 
                        Precio final: ${totalUnitarioConDescuento.toFixed(2)}    
                    </p>

                    <button 
                        onClick={() => onAgregarAlCarrito({ nombre, precioOriginal: precio, descuentoPorcentaje: descuento })} 
                        className="btn btn-primary btn-sm w-100 fw-semibold rounded-pill py-2 shadow-sm mb-2"
                        disabled={!disponible || stock === 0}
                    >
                        🛒 Agregar al Carrito
                    </button>

                    <button 
                        onClick={agregarProducto}
                        className="btn btn-success btn-sm w-100 fw-semibold rounded-pill py-2 shadow-sm"
                    >
                        🛒 Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardProducto;