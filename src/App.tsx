import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonColection from './components/PokemonColection';
import { Pokemon, Detail } from './interface';


interface Pokemons {
  name: string,
  url: string,
}

const App: React.FC = () => {
  const [Pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setloading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=200&limit=100")
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        console.log(poke.data);
        setPokemons((p) => [...p, poke.data]);
        setloading(false);
      });
    };
    getPokemon();
  }, [])

  const nextPage = async () => {
    setloading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((p) => [...p, poke.data]);
      setloading(false);
    })
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon nam</header>
        <PokemonColection pokemons={Pokemons} viewDetail={viewDetail} setDetail={setDetail} />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}> {loading ? "loading..." : "load more"}{" "} </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
