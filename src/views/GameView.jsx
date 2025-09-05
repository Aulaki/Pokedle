import { useGame } from "../context/GameContext";
import { usePokemonData } from "../hooks/usePokemonData";
import { comparePokemon } from "../utils/compareUtils";
import Header from "../components/Header/Header";
import PokeBuscador from "../components/Buscador/PokeBuscador";
import PokeOverlay from "../components/Overlay/PokeOverlay";
import Poketabla from "../components/Tabla/Poketabla";
import Targeta from "../components/Targeta/Targeta";
import { useRef, useEffect, useState } from "react";

const GameView = () => {
  const {
    targetPokemon,
    tablaPokemon,
    setTablaPokemon,
    victory,
    setVictory,
    volverAjugar,
  } = useGame();

  const { pokemonList, loading } = usePokemonData();
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredList(pokemonList.filter((p) => p.name.includes(value)));
  };

  const isThisPokemon = (poke) => {
    if (poke.name === targetPokemon.name) {
      setVictory(true);
      const result = {
        ...poke,
        harrow: "green",
        warrow: "green",
        ecolor: "green",
        t1color: "green",
        t2color: "green",
        ccolor: "green",
        lcolor: "green",
        gcolor: "green",
      };
      setTablaPokemon([result, ...tablaPokemon]);
    } else {
      const result = comparePokemon(poke, targetPokemon);
      setTablaPokemon([result, ...tablaPokemon]);
    }
    setSearch("");
  };

  if (loading || !targetPokemon) {
    return <p className="loading">Cargando Pokémon...</p>;
  }

  return (
    <div className="game-container">
      <Header />
      <div className="search-section" ref={searchRef}>
        <PokeBuscador
          handleSearch={handleSearch}
          search={search}
          victory={victory}
        />
        {search && (
          <PokeOverlay
            lista={filteredList}
            search={search}
            isThisPokemon={isThisPokemon}
          />
        )}
      </div>
      {victory && (
        <Targeta
          pokemon={targetPokemon}
          volverAjugar={() => volverAjugar(pokemonList)}
        />
      )}
      <Poketabla tablaPokemon={tablaPokemon} />
    </div>
  );
};

export default GameView;
