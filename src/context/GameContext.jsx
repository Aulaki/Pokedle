import { createContext, useContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [mode, setMode] = useState("daily");
  const [targetPokemon, setTargetPokemon] = useState(null);
  const [tablaPokemon, setTablaPokemon] = useState([]);
  const [victory, setVictory] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (mode === "daily") {
      const saved = JSON.parse(localStorage.getItem("pokedle-daily"));
      if (saved?.date === today) {
        setTargetPokemon(saved.pokemon);
        setTablaPokemon(saved.tabla || []);
        setVictory(saved.victory || false);
      } else {
        localStorage.removeItem("pokedle-daily");
      }
    } else {
      setTablaPokemon([]);
      setVictory(false);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "daily" && targetPokemon) {
      localStorage.setItem(
        "pokedle-daily",
        JSON.stringify({
          date: today,
          pokemon: targetPokemon,
          tabla: tablaPokemon,
          victory,
        })
      );
    }
  }, [tablaPokemon, victory, targetPokemon, mode]);

  const volverAjugar = (pokemonList) => {
    if (mode === "unlimited") {
      const nuevo = pokemonList[Math.floor(Math.random() * pokemonList.length)];
      setTargetPokemon(nuevo);
      setTablaPokemon([]);
      setVictory(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        mode,
        setMode,
        targetPokemon,
        setTargetPokemon,
        tablaPokemon,
        setTablaPokemon,
        victory,
        setVictory,
        volverAjugar,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);