import "./PokeOverlay.css";

const PokeOverlay = ({ lista, search, isThisPokemon }) => {
  return (
    <div className="overlay-container">
      <ul className="overlay-list">
        {lista.map((poke, i) => (
          <li key={i} className="overlay-item" onClick={() => isThisPokemon(poke)}>
            <img src={poke.sprite} alt={poke.name} className="overlay-img" />
            <span className="overlay-name">{poke.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokeOverlay;