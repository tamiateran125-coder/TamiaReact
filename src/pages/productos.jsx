import React, { useState } from 'react';
import CardProducto from '../componentes/cardProducto';
import Categoria from '../componentes/Categoria';

function Productos({ agregar }) {
    // Estado del cliente
    const [cliente, setCliente] = useState({
        nombre: '',
        ciudad: '',
        edad: ''
    });

    // Estado del Carrito Realista
    const [carrito, setCarrito] = useState([]);

    const handleClienteChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    // Función para agregar o incrementar un producto aplicando la matemática correcta
    const agregarAlCarrito = (producto) => {
        const existe = carrito.find(item => item.nombre === producto.nombre && item.descuentoPorcentaje === producto.descuentoPorcentaje);
        if (existe) {
            setCarrito(carrito.map(item => 
                item.nombre === producto.nombre && item.descuentoPorcentaje === producto.descuentoPorcentaje
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    // Función para disminuir cantidad
    const disminuirCantidad = (nombre, descuentoPorcentaje) => {
        const existe = carrito.find(item => item.nombre === nombre && item.descuentoPorcentaje === descuentoPorcentaje);
        if (existe.cantidad > 1) {
            setCarrito(carrito.map(item => 
                item.nombre === nombre && item.descuentoPorcentaje === descuentoPorcentaje 
                    ? { ...item, cantidad: item.cantidad - 1 } 
                    : item
            ));
        } else {
            setCarrito(carrito.filter(item => !(item.nombre === nombre && item.descuentoPorcentaje === descuentoPorcentaje)));
        }
    };

    // Eliminar producto por completo
    const eliminarDelCarrito = (nombre, descuentoPorcentaje) => {
        setCarrito(carrito.filter(item => !(item.nombre === nombre && item.descuentoPorcentaje === descuentoPorcentaje)));
    };

    // --- CÁLCULO MATEMÁTICO REALISTA Y EXACTO ---
    // Por cada ítem: [ (Precio Original + IVA 15%) - Descuento aplicado ] * Cantidad
    const totalCarrito = carrito.reduce((acc, item) => {
        let precioConIva = item.precioOriginal * 1.15;
        let precioConDescuento = precioConIva - (precioConIva * (item.descuentoPorcentaje / 100));
        return acc + (precioConDescuento * item.cantidad);
    }, 0);

    const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const finalizarCompra = () => {
        if (!cliente.nombre.trim()) {
            alert('Por favor ingresa el nombre del cliente en el panel izquierdo.');
            return;
        }
        if (carrito.length === 0) {
            alert('El carrito está vacío. Agrega al menos un producto.');
            return;
        }
        alert(`¡Compra realizada con éxito, ${cliente.nombre}!\nTotal pagado: $${totalCarrito.toFixed(2)}`);
        setCarrito([]);
        setCliente({ nombre: '', ciudad: '', edad: '' });
    };

    return (
        <div className="container-fluid py-4 px-4 bg-light min-vh-100">
            <div className="row g-4">
                
                {/* --- PANEL IZQUIERDO: CLIENTE Y CARRITO --- */}
                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: '20px', zIndex: 100 }}>
                        
                        {/* Tarjeta Datos del Cliente */}
                        <div className="card border-0 shadow-lg p-4 bg-white rounded-4 mb-4">
                            <div className="d-flex align-items-center mb-3 text-primary">
                                <span className="fs-3 me-2">👤</span>
                                <h4 className="fw-bold m-0">Datos del Cliente</h4>
                            </div>
                            <hr className="text-secondary opacity-25 mt-1" />

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-3 bg-light border-0 py-2" 
                                    placeholder="Ej. Tamia Terán"
                                    name="nombre"
                                    value={cliente.nombre}
                                    onChange={handleClienteChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Ciudad</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-3 bg-light border-0 py-2" 
                                    placeholder="Ej. Ibarra"
                                    name="ciudad"
                                    value={cliente.ciudad}
                                    onChange={handleClienteChange}
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-bold text-secondary">Edad</label>
                                <input 
                                    type="number" 
                                    className="form-control rounded-3 bg-light border-0 py-2" 
                                    placeholder="Ej. 21"
                                    name="edad"
                                    value={cliente.edad}
                                    onChange={handleClienteChange}
                                />
                            </div>
                        </div>

                        {/* Tarjeta Carrito Realista */}
                        <div className="card border-0 shadow-lg p-4 bg-white rounded-4">
                            <div className="d-flex align-items-center justify-content-between mb-3 text-success">
                                <div className="d-flex align-items-center">
                                    <span className="fs-3 me-2">🛒</span>
                                    <h4 className="fw-bold m-0">Carrito</h4>
                                </div>
                                <span className="badge bg-primary rounded-pill fs-6 px-3">
                                    {totalArticulos}
                                </span>
                            </div>
                            <hr className="text-secondary opacity-25 mt-1" />

                            {carrito.length === 0 ? (
                                <p className="text-muted text-center py-3 fst-italic">Tu carrito está vacío</p>
                            ) : (
                                <div className="mb-3" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                    {carrito.map((item, index) => {
                                        let pIva = item.precioOriginal * 1.15;
                                        let pFinal = pIva - (pIva * (item.descuentoPorcentaje / 100));
                                        return (
                                            <div key={index} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                                                <div style={{ maxWidth: '130px' }}>
                                                    <h6 className="m-0 fw-bold small text-truncate">{item.nombre}</h6>
                                                    <small className="text-muted">
                                                        ${pFinal.toFixed(2)} c/u {item.descuentoPorcentaje > 0 ? `(${item.descuentoPorcentaje}% off)` : ''}
                                                    </small>
                                                </div>
                                                <div className="d-flex align-items-center gap-1">
                                                    <button className="btn btn-outline-secondary btn-sm py-0 px-1" onClick={() => disminuirCantidad(item.nombre, item.descuentoPorcentaje)}>-</button>
                                                    <span className="small fw-bold px-1">{item.cantidad}</span>
                                                    <button className="btn btn-outline-secondary btn-sm py-0 px-1" onClick={() => agregarAlCarrito(item)}>+</button>
                                                    <button className="btn btn-outline-danger btn-sm py-0 px-1 ms-1" onClick={() => eliminarDelCarrito(item.nombre, item.descuentoPorcentaje)}>🗑️</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="bg-light p-3 rounded-3 mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold text-dark">Total a Pagar:</span>
                                    <span className="fs-5 fw-bold text-primary">${totalCarrito.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                className="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm"
                                onClick={finalizarCompra}
                            >
                                ✨ Finalizar Compra
                            </button>
                        </div>

                    </div>
                </div>

                {/* --- PANEL DERECHO: CATÁLOGO --- */}
                <div className="col-lg-8">
                    <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
                        <h1 className="fw-bold text-dark mb-1">Catálogo de Productos</h1>
                        <p className="text-muted mb-0">Selecciona los artículos y aplica tus descuentos antes de agregarlos al carrito.</p>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <CardProducto nombre="Producto 1" precio={19.99} disponible={true} stock={15} agregar={agregar} onAgregarAlCarrito={agregarAlCarrito} />
                        </div>
                        <div className="col-md-4">
                            <CardProducto nombre="Producto 2" precio={29.99} disponible={false} stock={0} agregar={agregar} onAgregarAlCarrito={agregarAlCarrito} />
                        </div>
                        <div className="col-md-4">
                            <CardProducto nombre="Producto 3" precio={39.99} disponible={true} stock={3} agregar={agregar} onAgregarAlCarrito={agregarAlCarrito} />
                        </div>
                    </div>

                    <Categoria titulo="Snacks y Aperitivos">
                        <div className="col-md-4 mb-3">
                            <CardProducto nombre="Chitos" precio={49.99} disponible={true} stock={20} agregar={agregar} onAgregarAlCarrito={agregarAlCarrito} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <CardProducto nombre="Papas" precio={59.99} disponible={false} stock={0} agregar={agregar} onAgregarAlCarrito={agregarAlCarrito} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <CardProducto nombre="Galletas" precio={69.99} disponible={true} stock={2} agregar={agregar} onAgregarAlCarrito={agregarAlCarrito} />
                        </div>
                    </Categoria>
                </div>

            </div>
        </div>
    );
}

export default Productos;