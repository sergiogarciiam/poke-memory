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
    <>
      <h1 className="title">Poké Memory</h1>

      {gameState === 0 ? (
        <MainMenu chooseMode={chooseMode}></MainMenu>
      ) : (
        <GameBoard
          number={gameState}
          goBackMainMenu={() => setGameState(0)}
        ></GameBoard>
      )}
    </>
  );
}

function getMode(mode) {
  return { Easy: 5, Medium: 10, Hard: 15 }[mode];
}

export default App;
