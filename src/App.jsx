import './App.css'
import Remitir from './routes/Remitir'
import Proveedores from './routes/Proveedores';
import MainMenu from './routes/MainMenu';
import { Routes, Route } from 'react-router-dom';
import Printable from './components/Printable';

function App() {
  return (
      <div className="bg-slate-200">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/remitir" element={<Remitir />} />
          <Route path="/imprimir" element={<Printable />} />
        </Routes>
      </div>
  )
}

export default App
