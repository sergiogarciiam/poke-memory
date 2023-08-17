function MainMenu({ chooseMode }) {
  return (
    <div className="main-menu">
      <p>Choose one mode...</p>
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
