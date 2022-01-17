import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SearchPokemonService from "../services/SearchPokemonService";
import { goNextPage, goBackPage } from "../actions/PokeSearchActions";
import "../styles/PokeSearch.css";

const PokeSearch = () => {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const pokemon = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getPokemon = async (offset, limit) => {
      const pokemon = await SearchPokemonService.getPokemon(offset, limit);

      dispatch({ type: "GET_POKEMON", pokemon: pokemon });
    };

    getPokemon(offset, limit);
  }, [offset]);

  return (
    <div>
      <input onChange={(e) => setSearchPokemon(e.target.value)}></input>
      <Link to={`/pokemon/${searchPokemon}`}>Search</Link>
      <ul>
        {pokemon &&
          pokemon.map((pokemon) => (
            <li>
              <button
                onClick={() => {
                  setSearchPokemon(pokemon.name);
                  history.push(`/pokemon/${pokemon.name}`);
                }}
              >
                <div className="card">
                  <img src={pokemon.art} alt={pokemon.name} />
                  <div className="container">
                    <h1>{pokemon.name}</h1>
                  </div>
                </div>
              </button>
            </li>
          ))}
        <button onClick={() => goBackPage(offset, setOffset, limit, setLimit)}>
          BACK
        </button>
        <button onClick={() => goNextPage(offset, setOffset, limit, setLimit)}>
          NEXT
        </button>
      </ul>
    </div>
  );
};

export default PokeSearch;
