import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from './interface';

interface Pokemons {
  name: string
  url: string
}



function App() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
        )

        setNextUrl(res.data.next)
        res.data.results.forEach(async (pokemon: Pokemons) => {
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

          setPokemons((p) => [...p, poke.data])
        })
    }
    getPokemon()
  }, [])

  const nextPage = async () => {
    let res = await axios.get(nextUrl)

    setNextUrl(res.data.next)

    setNextUrl(res.data.next)
        res.data.results.forEach(async (pokemon: Pokemons) => {
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

          setPokemons((p) => [...p, poke.data])
        })
  }
  return (
    <div className="App">
      <header className="pokemon-header">Pokemon</header>
      <PokemonCollection pokemons={pokemons} />
      <button onClick={nextPage}>Charger</button>
    </div>
  );
}

export default App;
