import { useState, useEffect } from 'react';
import Filtro from '../Filtro';
import { useNavigate } from "react-router-dom";

import './style.css';

function Listas() {
    const [data, setData] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await fetch("https://api.fbi.gov/wanted/v1/list");
                const json = await res.json();
                
                let lista = json.items;

                if (tipoSeleccionado !== 'All') {
                    lista = lista.filter(item => 
                        item.field_offices && item.field_offices.some(oficina => 
                            oficina.toLowerCase() === tipoSeleccionado.toLowerCase()
                        )
                    );
                }

                setData(lista);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        obtenerDatos();
    }, [tipoSeleccionado]);

    const handleTipoChange = (tipo) => {
        setTipoSeleccionado(tipo);
    };

    let resultados = data;

    if (busqueda.length >= 3 && isNaN(busqueda)) {
        resultados = data.filter(persona =>
            persona.title.toLowerCase().includes(busqueda.toLowerCase())
        );
    }

    if (!isNaN(busqueda)) {
        resultados = data.filter(persona =>
            persona.uid.includes(busqueda)
        );
    }

    return (
        <>
            <input
                type="text"
                placeholder="Buscar criminales"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="c-buscador"
            />
            <Filtro onTipoChange={handleTipoChange} />
            <section className='c-lista'>
                {resultados.map((persona, index) => (
                    <div 
                        className='c-lista-pokemon' 
                        onClick={() => navigate(`/MostWanted/${persona.uid}`)}
                        key={index}
                    >
                        <p>ID: {persona.uid}</p>
                        <img 
                            src={persona.images?.[0]?.thumb || 'https://via.placeholder.com/100'} 
                            alt={`Persona ${persona.title}`} 
                            width='auto' 
                            height='100' 
                            loading='lazy'
                        />
                        <p>{persona.title}</p>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Listas;
