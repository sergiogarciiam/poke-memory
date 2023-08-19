import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { usePokemonList } from "../utils/usePokemonList";
import { isGameComplete, shufflePokemon } from "../utils/gameFunctions";

import Card from "./Card";
import Menu from "./Menu";

function GameBoard({ number, goBackMainMenu }) {
  // STATES
  const [state, setState] = useState({
    round: 0,
    numberPokemon: number,
    isFinishGame: false,
    isGameOver: false,
    score: 0,
    bestScore: JSON.parse(localStorage.getItem("bestScore")) || 0,
  });
  const { pokemonList, setPokemonList } = usePokemonList(
    state.numberPokemon,
    state.round
  );

  // USE EFFECT
  useEffect(() => {
    localStorage.setItem("bestScore", state.bestScore);
  }, [state.bestScore]);

  // FUNCTIONS
  const getNewBoard = (targetPokemonName) => {
    const newScore = state.score + 1;

    if (newScore > state.bestScore) {
      setState({ ...state, score: newScore, bestScore: newScore });
    } else {
      setState({ ...state, score: newScore });
    }

    const updatedPokemonList = pokemonList.map((pokemon) => {
      if (pokemon.name === targetPokemonName) {
        return { ...pokemon, click: true };
      }
      return pokemon;
    });

    if (isGameComplete(updatedPokemonList)) setFinishResult(false);
    else setPokemonList(shufflePokemon(updatedPokemonList));
  };

  const updateGameSettings = (number) => {
    if (number === 0) {
      setState({
        ...state,
        score: 0,
        round: state.round + 1,
        isFinishGame: false,
      });
    } else if (state.numberPokemon === 15) {
      setState({ ...state, round: state.round + 1, isFinishGame: false });
    } else {
      setState({
        ...state,
        numberPokemon: state.numberPokemon + number,
        isFinishGame: false,
      });
    }
  };

  const setFinishResult = (isOver) => {
    setState({ ...state, isFinishGame: true, isGameOver: isOver });
  };

  // RENDER
  return (
    <>
      <div className="scores-container">
        <p>Score: {state.score}</p>
        <p>High Score: {state.bestScore}</p>
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
      {state.isFinishGame && (
        <>
          <Menu
            score={state.score}
            isGameOver={state.isGameOver}
            updateGameSettings={updateGameSettings}
            goBackMainMenu={goBackMainMenu}
          ></Menu>
          <div className="blocker"></div>
        </>
      )}
    </>
  );
}

GameBoard.propTypes = {
  number: PropTypes.number.isRequired,
  goBackMainMenu: PropTypes.func.isRequired,
};

export default GameBoard;
