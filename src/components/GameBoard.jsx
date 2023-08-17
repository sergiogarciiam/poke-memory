import { useState, useEffect } from "react";
import Card from "./Card";
import Menu from "./Menu";

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

function GameBoard({ number, goBackMainMenu }) {
  // STATES
  const [round, setRound] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [numberPokemon, setNumberPokemon] = useState(number);
  const [isFinishGame, setIsFinishGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // BEST SCORE STATE
  const initialBestScore = JSON.parse(localStorage.getItem("bestScore")) || 0;
  const [bestScore, setBestScore] = useState(initialBestScore);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore]);

  // POKEMON LIST
  useEffect(() => {
    const uniqueNumbers = getRandomNumbers(numberPokemon);
    const fetchPokemon = async () => {
      const promises = uniqueNumbers.map((number) => fetchPokemonData(number));
      const fetchedPokemon = await Promise.all(promises);
      setPokemonList(fetchedPokemon);
    };

    fetchPokemon();
  }, [numberPokemon, round]);

  // INTERNAL FUNCTIONS
  const getNewBoard = (targetPokemonName) => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore > bestScore) setBestScore(newScore);

    const updatedPokemonList = pokemonList.map((pokemon) => {
      if (pokemon.name === targetPokemonName) {
        return { ...pokemon, click: true };
      }
      return pokemon;
    });

    if (isGameComplete(updatedPokemonList)) {
      setFinishResult(false);
    } else {
      const newPokemonList = shufflePokemon(updatedPokemonList);
      setPokemonList(newPokemonList);
    }
  };

  const setFinishResult = (isGameOver) => {
    setIsFinishGame(true);
    setIsGameOver(isGameOver);
  };

  const prepareNewGame = (number) => {
    if (number === 0) setScore(0);

    if (number === 0 || numberPokemon === 15) {
      const newRound = round + 1;
      setRound(newRound);
    } else {
      const newNumber = numberPokemon + number;
      setNumberPokemon(newNumber);
    }
    setIsFinishGame(false);
  };

  // RENDER
  return (
    <>
      <div className="scores-container">
        <p>
          Score: {score} / {numberPokemon + score}
        </p>
        <p>High Score: {bestScore}</p>
      </div>

      <div className="game-board">
        {pokemonList.map((pokemon) => {
          return (
            <Card
              key={pokemon.name}
              pokemon={pokemon}
              getNewBoard={getNewBoard}
              setFinishResult={setFinishResult}
            ></Card>
          );
        })}
      </div>
      {isFinishGame && (
        <Menu
          isGameOver={isGameOver}
          score={score}
          prepareNewGame={prepareNewGame}
          goBackMainMenu={goBackMainMenu}
        ></Menu>
      )}
    </>
  );
}

// FUNCTIONS
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
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      click: false,
    };

    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw error;
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

function isGameComplete(array) {
  const noClickedPokemon = array.filter((pokemon) => !pokemon.click);

  console.log(noClickedPokemon);
  if (noClickedPokemon.length === 0) return true;
  else return false;
}

function shufflePokemon(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export default GameBoard;
