function Filtro({ onTipoChange }) {
    const oficinas = [
      "All",
      "miami", 
      "newyork", 
      "losangeles", 
      "chicago", 
      "washingtondc",
      "boston",
      "houston",
      "dallas",
      "atlanta"
    ];
  
    return (
      <div className="c-filtro">
        {oficinas.map((unaOficina, index) => (
          <button className='' key={index} onClick={() => onTipoChange(unaOficina)}>
            {unaOficina.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }
  
  export default Filtro;
  