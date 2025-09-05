import { useEffect, useState } from "react";
import { getDailyPokemon } from "../utils/getDailyPokemon";
import { useGame } from "../context/GameContext";

export const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mode, setTargetPokemon } = useGame();

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
        const res = await fetch(baseUrl);
        const data = await res.json();

        const detailedData = await Promise.all(
          data.results.map(async ({ url }) => {
            const poke = await fetch(url).then((r) => r.json());
            const species = await fetch(poke.species.url).then((r) => r.json());
            const evoChain = await fetch(species.evolution_chain.url).then((r) => r.json());

            let evo = 1;
            const name = poke.forms[0].name;
            if (evoChain.chain?.species.name === name) evo = 1;
            else if (evoChain.chain.evolves_to[0]?.species.name === name) evo = 2;
            else if (
              evoChain.chain.evolves_to[0]?.evolves_to[0]?.species.name === name
            )
              evo = 3;

            const generation = species.generation.name.split("-")[1].toUpperCase();

            return {
              name,
              type1: poke.types[0].type.name,
              type2: poke.types[1]?.type.name || null,
              height: poke.height,
              weight: poke.weight,
              abilities: poke.abilities.map((a) => a.ability.name),
              color: species.color.name,
              habitat: species.habitat?.name || "unknown",
              generation,
              description: species.genera?.[7]?.genus || "",
              sprite: poke.sprites.other["official-artwork"].front_default,
              evo,
            };
          })
        );

        setPokemonList(detailedData);

        const saved = JSON.parse(localStorage.getItem("pokedle-daily"));
        const isSameDay = saved?.date === today;

        if (mode === "daily" && isSameDay && saved?.pokemon) {
          setTargetPokemon(saved.pokemon);
        } else {
          const target =
            mode === "daily"
              ? getDailyPokemon(detailedData)
              : detailedData[Math.floor(Math.random() * detailedData.length)];

          setTargetPokemon(target);

          if (mode === "daily") {
            localStorage.setItem(
              "pokedle-daily",
              JSON.stringify({
                date: today,
                pokemon: target,
                tabla: [],
                victory: false,
              })
            );
          }
        }
      } catch (err) {
        console.error("Error loading Pokémon data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode, setTargetPokemon]);

  return { pokemonList, loading };
};