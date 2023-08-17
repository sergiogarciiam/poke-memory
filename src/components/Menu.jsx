function Menu({ isGameOver, score, prepareNewGame, goBackMainMenu }) {
  return (
    <div className="menu">
      {isGameOver ? <h2>Game Over</h2> : <h2>You Win!</h2>}
      <p>Your score was: {score}</p>
      {isGameOver ? (
        <button onClick={() => prepareNewGame(0)}>Play Again</button>
      ) : (
        <button onClick={() => prepareNewGame(5)}>Keep Playing</button>
      )}
      <button onClick={goBackMainMenu}>Main Menu</button>
    </div>
  );
}

export default Menu;
