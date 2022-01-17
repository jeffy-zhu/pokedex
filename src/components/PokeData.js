import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SearchPokemonService from "../services/SearchPokemonService";

const PokeData = () => {
  const pokeData = useSelector((state) => state.pokeData);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const getPokeData = async (name) => {
      const pokeData = await SearchPokemonService.getPokeData(name);

      dispatch({ type: "GET_POKEDATA", pokeData: pokeData });
    };

    getPokeData(params.pokemon);
  }, [params.pokemon]);

  return (
    <div>
      {pokeData && (
        <div className="card">
          <img src={pokeData.art} alt={pokeData.name} />
          <div className="container">
            <h3>
              #{pokeData.id} {pokeData.name}
            </h3>
            <p>
              {pokeData.types.length === 1
                ? pokeData.types[0]
                : pokeData.types[0] + "/" + pokeData.types[1]}
            </p>
            <p>{pokeData.descriptions[0].flavor_text}</p>
            {pokeData.stats.map((stat) => {
              return (
                <p>
                  {stat[0]}: <span>{stat[1]}</span>
                </p>
              );
            })}
            <p>
              {pokeData.evolutions.species.name}
              {pokeData.evolutions.evolves_to.length > 0 &&
                " > " + pokeData.evolutions.evolves_to[0].species.name}
              {pokeData.evolutions.evolves_to.length > 0 &&
                pokeData.evolutions.evolves_to[0].evolves_to.length > 0 &&
                " > " +
                  pokeData.evolutions.evolves_to[0].evolves_to[0].species.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeData;
