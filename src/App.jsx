import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Aleatorios from './Componentes/Aleatorios';
import Capturados from './Componentes/Capturados';
import Favoritos from './Componentes/Favoritos';
import Listas from './Componentes/Listas';
import MostWanted from './Componentes/MostWanted'; // <- aquí cambia Pokemon por MostWanted
import Usuarios from './Componentes/Usuarios';
import Menu from './Componentes/Menu';
import './App.css';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/Aleatorios" element={<Aleatorios />} />
        <Route path="/Capturados" element={<Capturados />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/" element={<Listas />} />
        <Route path="/MostWanted/:id" element={<MostWanted />} /> {/* <- aquí también cambia */}
        <Route path="/Usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;
