//useEffect sirve para ejecutar una función cuando el componente se monta, se actualiza o se desmonta. Se puede usar para realizar tareas como obtener datos de una API, suscribirse a eventos o limpiar recursos cuando el componente se desmonta.
import {useState, useEffect} from 'react';
//tarjetaOferta
import Tarjetaoferta from "../componentes/TarjetaOferta"; 

function Catalogo( {agregar} ) {
    //manejo dele stado de carga de productos
    //cargamos los productos

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");//manejo de errores
    const [productos, setProductos] = useState ([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=8')
            .then(respuesta => respuesta.json())
            .then(datos => {

                setProductos(datos.products);
                setCargando(false);
            })
            .catch(() => {
                setError("No se carga los datos");
                setCargando(false);
            });
    }, []);

    //Coprobando la conexion
    if (cargando) {
        return <p>Cargando ofertas</p>;
    }
    else {
        if (error!== "") {
            return <p>Error: {error}</p>;
        }
    }

    return(

        <div> 
            <h2>Catalogo web</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {productos.map((producto) => (
                <Tarjetaoferta
                imagen={producto.thumbnail}
                key={producto.id} 
                nombre = {producto.title}
                precio = {producto.price}
                disponible={true}
                stock={producto.stock}
                agregar={agregar}
                descuento={producto.discountPercentage}
                />
            ))  }
            </div>
            
        </div>  


    )

}   

export default Catalogo;