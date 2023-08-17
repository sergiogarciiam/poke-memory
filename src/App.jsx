import { useState } from "react";
import GameBoard from "./components/GameBoard";
import MainMenu from "./components/MainMenu";
import Menu from "./components/Menu";

function App() {
  const [gameState, setGameState] = useState(0);
  const [isFinishGame, setIsFinishGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const chooseMode = (e) => {
    const mode = e.target.textContent;
    setGameState(getMode(mode));
  };

  const setFinishResult = (isGameOver) => {
    setIsFinishGame(true);
    setIsGameOver(isGameOver);
  };

  return (
    <div className="page">
      {gameState === 0 ? (
        <MainMenu chooseMode={chooseMode}></MainMenu>
      ) : (
        <>
          <GameBoard
            numberPokemon={gameState}
            setFinishResult={setFinishResult}
          ></GameBoard>
          {isFinishGame && <Menu isGameOver={isGameOver}></Menu>}
        </>
      )}
    </div>
  );
}

function getMode(mode) {
  return { Easy: 5, Medium: 10, Hard: 15 }[mode];
}

export default App;
