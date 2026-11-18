import { useState } from 'react';

function TarjetaOferta({ nombre, precio, descuento, agregar }) { 
    // Valor del descuento
    const valorDescuento = precio * (descuento / 100);
    // Precio final sin IVA
    const precioFinal = precio - valorDescuento;
    // IVA (15%)
    const iva = precioFinal * 0.15;
    // Precio final con IVA incluido
    const precioFinalConIva = precioFinal + iva;

    // --- CICLO FOR PARA CALCULAR EL AHORRO ---
    let ahorroTotalAcumulado = 0;
    for (let i = 1; i <= 3; i++) {
        ahorroTotalAcumulado += valorDescuento;
    }

    let colorstock;
    if (descuento > 10) {
        colorstock = 'bg-danger';
    } else {
        colorstock = 'bg-secondary';
    }

    // Función tradicional para enviar el nombre y el precio final con descuento
    function agregarProducto() {
        agregar(nombre, precioFinalConIva);
    }

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 p-2">
            <div className="card-body d-flex flex-column">
                
                {/* 🛒 INDICADOR DE AHORRO (ARRIBA DE LA TARJETA) */}
                <div className="alert alert-success py-1 px-2 small mb-2 text-center fw-semibold">
                    ¡Ahorras ${valorDescuento.toFixed(2)} por unidad! 
                    <br />
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                        (Ahorro por 3 u: ${ahorroTotalAcumulado.toFixed(2)})
                    </span>
                </div>

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
    );
}

export default TarjetaOferta;