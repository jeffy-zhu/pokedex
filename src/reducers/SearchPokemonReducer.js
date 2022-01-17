const searchPokemonReducer = (state = {}, action) => {
  if (action.type === "GET_POKEDATA") {
    return {
      ...state,
      pokeData: action.pokeData,
    };
  }
  if (action.type === "GET_POKEMON") {
    return {
      ...state,
      pokemon: action.pokemon,
    };
  }
  return state;
};

export default searchPokemonReducer;
