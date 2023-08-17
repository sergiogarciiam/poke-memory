function MainMenu({ chooseMode }) {
  return (
    <div className="main-menu">
      <p>
        Get points by clicking on a pokemon, but don&lsquo;t click on any more
        than once!
      </p>
      <p>Choose one mode:</p>
      <div className="buttons-container">
        <button onClick={chooseMode}>Easy</button>
        <button onClick={chooseMode}>Medium</button>
        <button onClick={chooseMode}>Hard</button>
      </div>
      <p>
        Take a look the{" "}
        <a
          href="https://github.com/sergiogarciiam/poke-memory"
          target="__blank"
        >
          github repo
        </a>{" "}
      </p>
    </div>
  );
}

export default MainMenu;
