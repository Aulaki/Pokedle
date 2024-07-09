import "./pokedle.scss";
import { useEffect, useState } from "react";
import { Poketabla } from "./Tabla/Tabla";
import { PokeBuscador } from "./Buscador.jsx/Buscador";
import { PokeOverlay } from "./Overlay/Overlay";
import { Targeta } from "./Targeta/Targeta";

export const PokedleV2 = () => {
  const [listPokemon, setListPokemon] = useState([]);
  const [listGamePokemon, setListGamePokemon] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [search, setSearch] = useState("");
  const [listaSearch, setListaSearch] = useState([]);
  const [tablaPokemon, setTablaPokemon] = useState([]);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    obtenerDatosPokemon();
  }, []);

  const obtenerDatosPokemon = async () => {
    let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      try {
        let pokeResponse = await Promise.all(
          data.results.map(async (result) => {
            const res = await fetch(result.url);
            return res.json();
          })
        );
        let pokeData = await Promise.all(
          pokeResponse.map(async (poke) => {
            const pokeres = await fetch(poke.species.url);
            const pokedata = await pokeres.json();
            let result = await fetch(pokedata.evolution_chain.url);
            let pokeEvo = await result.json();

            let evo = 1;

            if (pokeEvo.chain?.species.name == poke.forms[0].name) {
              evo = 1;
            } else if (
              pokeEvo.chain.evolves_to[0]?.species.name == poke.forms[0].name
            ) {
              evo = 2;
            } else if (
              pokeEvo.chain?.evolves_to[0].evolves_to[0]?.species.name ==
              poke.forms[0].name
            ) {
              evo = 3;
            }

            let generation = pokedata.generation.name
              .split("-")[1]
              .toUpperCase();

            let newpokemon = {
              name: poke.forms[0].name,
              type1: poke.types[0].type.name,
              type2: poke.types[1]?.type.name,
              height: poke.height,
              weight: poke.weight,
              abilities: [
                poke.abilities[0].ability.name,
                poke.abilities[1]?.ability.name,
                poke.abilities[2]?.ability.name,
              ],
              color: pokedata.color.name,
              habitat: pokedata.habitat.name,
              generation: generation,
              description: pokedata.genera[7].genus,
              sprite: poke.sprites.other[`official-artwork`].front_default,
              evo: evo,
            };
            return newpokemon;
          })
        );
        
        setListPokemon(pokeData);
        setListGamePokemon(pokeData);
        setPokemon(pokeData[Math.floor(Math.random() * pokeData.length)]);
      } catch (error) {
        console.error("Error al obtener datos de Pokémon:", error);
      }
    } catch (error) {
      console.error("Error al obtener datos de Pokémon:", error);
    }
  };
  console.log(pokemon);
  const searchPokemon = (e) => {
    const { value } = e.target;
    setSearch(value);
    setListaSearch(
      listGamePokemon.filter((e) => {
        if (e.name.includes(value.toLowerCase())) {
          return e;
        }
      })
    );
  };

  const isThisPokemon = (poke) => {
    if (poke.name === pokemon.name) {
      setVictory(true);
      let newAtributes = {
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
      setTablaPokemon([newAtributes, ...tablaPokemon]);
    } else {
      let harrow =
        poke.height < pokemon.height
          ? "ftop"
          : poke.height > pokemon.height
          ? "fbot"
          : "green";
      let warrow =
        poke.weight < pokemon.weight
          ? "ftop"
          : poke.weight > pokemon.weight
          ? "fbot"
          : "green";
      let t1color =
        poke.type1 === pokemon.type1
          ? "green"
          : poke.type1 === pokemon.type2
          ? "orange"
          : "red";
      let t2color =
        poke.type2 === pokemon.type2
          ? "green"
          : poke.type2 === pokemon.type1
          ? "orange"
          : "red";
      let ccolor = poke.color === pokemon.color ? "green" : "red";
      let lcolor = poke.habitat === pokemon.habitat ? "green" : "red";
      let gcolor = poke.generation === pokemon.generation ? "green" : "red";
      let ecolor = poke.evo == pokemon.evo ? "green" : "red";
      let newAtributes = {
        ...poke,
        t1color,
        t2color,
        ccolor,
        lcolor,
        gcolor,
        warrow,
        harrow,
        ecolor,
      };
      setTablaPokemon([newAtributes, ...tablaPokemon]);
      setListGamePokemon(listGamePokemon.filter((p) => poke.name != p.name));
    }
    setSearch("");
  };

  const volverAjugar = () => {
    setListGamePokemon(listPokemon)
    setPokemon(listPokemon[Math.floor(Math.random() * listPokemon.length)])
    setTablaPokemon([])
    setVictory(false)
  }

  return (
    <div className="fondo">
      <div className=".title d-flex justify-content-center align-content-center">
        <img className="title" src="/image/Pokedle.png" alt="" />
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center pt-4 position-relative">
        <PokeBuscador
          handleSearch={searchPokemon}
          search={search}
          victory={victory}
        />
        {search && (
          <PokeOverlay
            lista={listaSearch}
            search={search}
            isThisPokemon={isThisPokemon}
          />
        )}
      </div>
      {victory && <Targeta pokemon={pokemon} volverAjugar={volverAjugar}/>}
      <Poketabla tablaPokemon={tablaPokemon} />
    </div>
  );
};
