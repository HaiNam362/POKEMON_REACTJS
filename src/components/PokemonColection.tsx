import React from "react";
import { Pokemon, Detail, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./Pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>
};

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;
  const selectedPokemon = (id: number) => {
    console.log(id);
    if(!viewDetail.isOpened){
      setDetail({
        id: id,
        isOpened: true,
      })
    }
  }
  return (

    <section className={viewDetail.isOpened ? 'collection-container-active' : 'collection-container'}>
      {viewDetail.isOpened ? (
        <div className="overlay">
          
        </div>
      ) : (
        <div className=""></div>
      )}
      {pokemons.map((pokemon) => {
        return (
          <div onClick={() => selectedPokemon(pokemon.id)}>
            <PokemonList
              viewDetail={viewDetail}
              setDetail={setDetail}
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              abilities={pokemon.abilities}
              image={pokemon.sprites.front_default}
            />
          </div>
        )
      })}
    </section>

  );
};

export default PokemonColection;
