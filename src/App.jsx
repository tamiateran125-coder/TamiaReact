import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Encabezado from './componentes/encabezado.jsx'
import Pie from './componentes/pie.jsx'
import Inicio from './pages/inicio.jsx'
import Productos from './pages/productos.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react' // 👈 Con llaves { useState }
import Compras from './pages/compras.jsx'
import Catalogoweb from './pages/Catalogoweb.jsx'
import Ofertas from './pages/Ofertas.jsx'



function App() {

  const [lista, setLista] = useState([])
    
  
  function agregar(nombre, precio) {
    const producto = { nombre: nombre, precio: precio };
    
    setLista([...lista, producto]); 
    
  }
 
  console.log('Lista de compras actualizada:', lista);

  function vaciar() {
    setLista([]);
    
  }


  return (
    <BrowserRouter>
      <main>
        <section>
          <Encabezado titulo="Tienda PUCE Ibarra" />
          
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos agregar={agregar} />} />
            <Route path="/compras" element={<Compras lista={lista} vaciar={vaciar} />} />
            <Route path="/Catalogoweb" element={<Catalogoweb agregar={agregar}/>} /> 
            <Route path="/Ofertas" element={<Ofertas agregar={agregar}/>} />
          </Routes>
        </section>

        <Pie />
      </main>
    </BrowserRouter>
  )
}

export default App