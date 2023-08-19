import PropTypes from "prop-types";

function Menu({ score, isGameOver, updateGameSettings, goBackMainMenu }) {
  return (
    <div className="menu">
      {isGameOver ? <h2>Game Over</h2> : <h2>You Win!</h2>}
      <p>Your score was: {score}</p>
      {isGameOver ? (
        <button onClick={() => updateGameSettings(0)}>Play Again</button>
      ) : (
        <button onClick={() => updateGameSettings(5)}>Keep Playing</button>
      )}
      <button onClick={goBackMainMenu}>Main Menu</button>
    </div>
  );
}

Menu.propTypes = {
  score: PropTypes.number.isRequired,
  isGameOver: PropTypes.func.isRequired,
  updateGameSettings: PropTypes.func.isRequired,
  goBackMainMenu: PropTypes.func.isRequired,
};

export default Menu;
