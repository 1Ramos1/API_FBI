import { useState, useEffect } from 'react';
import './style.css';

function Recompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://api.fbi.gov/wanted/v1/list')
      .then(response => response.json())
      .then(data => {
        const conRecompensa = data.items.filter(item => item.reward_text);
        setRecompensas(conRecompensa);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando recompensas...</p>;

  return (
    <div className="recompensas-container">
      <h2>Fugitivos con Recompensa</h2>
      {recompensas.length === 0 ? (
        <p>No se encontraron fugitivos con recompensa.</p>
      ) : (
        <ul className="lista-recompensas">
          {recompensas.map((f) => (
            <li key={f.uid} className="recompensa-item">
              <img src={f.images?.[0]?.thumb || 'https://via.placeholder.com/100'} alt={f.title} />
              <div>
                <p><strong>Nombre:</strong> {f.title}</p>
                <p><strong>Recompensa:</strong> {f.reward_text}</p>
                <p><strong>Ubicación:</strong> {f.field_offices?.join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recompensas;
