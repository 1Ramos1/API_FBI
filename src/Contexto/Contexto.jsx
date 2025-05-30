import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Estado global
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
  const capturadosGuardados = JSON.parse(localStorage.getItem("capturados")) || [];

  const [favoritos, setFavoritos] = useState(favoritosGuardados);
  const [listaCapturados, setListaCapturados] = useState(capturadosGuardados);

  // Datos desde la API del FBI
  const [data, setData] = useState([]);
  const [campoBusqueda, setCampoBusqueda] = useState(''); // si decides usar filtros en el futuro

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(`https://api.fbi.gov/wanted/v1/list`);
        const json = await res.json();
        setData(json.items || []);
      } catch (error) {
        console.error("Error al cargar datos del FBI:", error);
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("capturados", JSON.stringify(listaCapturados));
  }, [listaCapturados]);

  return (
    <AppContext.Provider value={{
      favoritos, setFavoritos,
      listaCapturados, setListaCapturados,
      data, setData,
      campoBusqueda, setCampoBusqueda
    }}>
      {children}
    </AppContext.Provider>
  );
}
