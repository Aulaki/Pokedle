import "./PokeBuscador.css";

const PokeBuscador = ({ handleSearch, search, victory }) => {
  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Busca un Pokémon..."
        value={search}
        onChange={handleSearch}
        disabled={victory}
        className="buscador-input"
        aria-label="Buscar Pokémon"
      />
    </div>
  );
};

export default PokeBuscador;