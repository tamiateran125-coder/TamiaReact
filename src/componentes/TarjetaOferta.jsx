

import React, { useState } from 'react';
//props a recibir nombre, precio descuento, y agregar


function TarjetaOferta({ nombre, precio, descuento, agregar }) { 

    const [descuento, setDescuento] = useState(0);
    
    // valor del descuento
    const valorDescuento = precio * (descuento / 100);
    // precio final
    const precioFinal = precio - valorDescuento;
    // iva
    const iva = precioFinal * 0.15;
    // precio final con iva
    const precioFinalConIva = precioFinal + iva;

    function agregarProducto() {
        agregar(nombre, precio);
        
    }

    let colorstock;
    if (descuento > 10) {
        colorstock = 'bg-danger';
   } else {
    //color gris
        colorstock = 'bg-';
    }

    return (
        //arriba de la tarjeta... cuanto ahorra con un ciclo for, cuanto se ahorra si compra uno de cada producto


        //tarjetaOferta 
        <div className="card h-100 shadow-sm border-0 rounded-4 p-2">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-dark">{nombre}</h5>
                <p className="card-text mb-1 text-muted small">Antes: ${precio.toFixed(2)}</p>
                <p className="card-text mb-1 text-muted small">Descuento: {descuento}%</p>
                <p className="card-text mb-1 text-muted small">Ahora: ${precioFinal.toFixed(2)}</p>
                <p className="card-text mb-1 text-muted small">IVA (15%): ${iva.toFixed(2)}</p>
                <p className="card-text fw-bold text-primary mb-2">Total IVA: ${precioFinalConIva.toFixed(2)}</p>

                <div className="mb-3 d-flex gap-1 flex-wrap">
                    
                    <span className={`badge ${colorstock}`}>
                        {descuento > 10 ? `Gran oferta` : 'Oferta'}
                    </span>
                </div>
                
                <button 
                

                        onClick={agregarProducto}
                        className="btn btn-success btn-sm w-100 fw-semibold rounded-pill py-2 shadow-sm"
                    >
                        🛒 Agregar
                </button>
            
            </div>
        </div>
    )


}
