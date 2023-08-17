function Menu({ isGameOver }) {
  return (
    <div className="menu">
      {isGameOver ? <h2>Game Over</h2> : <h2>You Win!</h2>}
      {isGameOver ? <button>Keep Playing</button> : <button>Play Again</button>}
      <button>Main Menu</button>
    </div>
  );
}

export default Menu;
