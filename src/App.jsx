import { useState } from "react";
import GameBoard from "./components/GameBoard";
import MainMenu from "./components/MainMenu";

function App() {
  const [gameState, setGameState] = useState(0);

  const chooseMode = (e) => {
    const mode = e.target.textContent;
    setGameState(getMode(mode));
  };

  return (
    <div className="page">
      {gameState === 0 ? (
        <MainMenu chooseMode={chooseMode}></MainMenu>
      ) : (
        <GameBoard
          number={gameState}
          goBackMainMenu={() => setGameState(0)}
        ></GameBoard>
      )}
    </div>
  );
}

function getMode(mode) {
  return { Easy: 5, Medium: 10, Hard: 15 }[mode];
}

export default App;
