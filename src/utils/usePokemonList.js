import { useState, useEffect } from "react";

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export function usePokemonList(numberPokemon, round) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const uniqueNumbers = getRandomNumbers(numberPokemon);
    const fetchPokemon = async () => {
      const promises = uniqueNumbers.map((number) => fetchPokemonData(number));
      const fetchedPokemon = await Promise.all(promises);
      setPokemonList(fetchedPokemon);
    };

    fetchPokemon();
  }, [numberPokemon, round]);

  return { pokemonList, setPokemonList };
}

async function fetchPokemonData(pokemonNumber) {
  try {
    const response = await fetch(`${API_BASE_URL}${pokemonNumber}`, {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from PokeAPI");
    }

    const pokemonData = await response.json();

    const pokemon = {
      name: capitalizeFirstLetter(pokemonData.name),
      image: pokemonData.sprites.front_default,
      click: false,
    };

    return pokemon;
  } catch (error) {
    throw new Error("Error fetching Pokemon data", error);
  }
}

function getRandomNumbers(count) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * 1010) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
