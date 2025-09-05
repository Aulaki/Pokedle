export const getDailyPokemon = (pokemonList, date = new Date()) => {
  const seed = date.toISOString().slice(0, 10);
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % pokemonList.length;
  return pokemonList[index];
};