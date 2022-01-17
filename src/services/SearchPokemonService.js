export const getPokemon = async (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  let pokemon = await response.json();

  const sprites = await Promise.all(
    pokemon.results.map(async (result) => {
      const url = result.url;
      const response = await fetch(url);
      const pokemon = await response.json();

      return pokemon.sprites.front_default;
    })
  );

  pokemon = pokemon.results.map((result, i) => {
    return {
      name: result.name,
      art: sprites[i],
    };
  });

  return pokemon;
};

export const getPokeData = async (name) => {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;
  let response = await fetch(url);
  const pokeSpecies = await response.json();

  url = pokeSpecies.varieties.filter(
    (variety) => variety.is_default === true
  )[0].pokemon.url;
  response = await fetch(url);
  const pokemon = await response.json();

  url = pokeSpecies.evolution_chain.url;
  response = await fetch(url);
  const evoChain = await response.json();

  const pokeData = {
    id: pokeSpecies.id,
    name: pokeSpecies.name,
    types: pokemon.types.map((type) => type.type.name),
    stats: pokemon.stats.map((stat) => [stat.stat.name, stat.base_stat]), // HP, Attack, Defense, Sp Atk, Sp Def, Speed
    art: pokemon.sprites.front_default,
    descriptions: pokeSpecies.flavor_text_entries.filter(
      (description) => description.language.name === "en"
    ),
    evolutions: evoChain.chain,
  };

  return pokeData;
};

export default {
  getPokemon,
  getPokeData,
};
