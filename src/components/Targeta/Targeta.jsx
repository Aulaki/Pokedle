import { useGame } from "../../context/GameContext";
import "./Targeta.css";

const Targeta = ({ pokemon, volverAjugar }) => {
  const { mode } = useGame();

  return (
    <div className="targeta-container">
      <div className="targeta-content">
        <img src={pokemon.sprite} alt={pokemon.name} className="targeta-img" />
        <p className="targeta-text">
          El Pokémon era: <strong>{pokemon.name}</strong>
        </p>

        {mode === "unlimited" ? (
          <button className="targeta-button" onClick={volverAjugar}>
            Volver a jugar
          </button>
        ) : (
          <p className="targeta-daily-message">¡Vuelve mañana para otro reto!</p>
        )}
      </div>
    </div>
  );
};

export default Targeta;