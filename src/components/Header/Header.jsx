import { useGame } from "../../context/GameContext";
import "./Header.css";

const Header = () => {
  const { mode, setMode } = useGame();

  return (
    <header className="header">
      <div className="title-container">
        <img
          src="/assets/images/Pokedle.png"
          alt="Pokedle"
          className="title-image"
        />
      </div>
      <div className="mode-selector">
        <button
          className={mode === "daily" ? "active" : ""}
          onClick={() => setMode("daily")}
        >
          Diario
        </button>
        <button
          className={mode === "unlimited" ? "active" : ""}
          onClick={() => setMode("unlimited")}
        >
          Sin límites
        </button>
      </div>
    </header>
  );
};

export default Header;