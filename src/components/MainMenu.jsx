function MainMenu({ chooseMode }) {
  return (
    <>
      <h1 className="title">Poke Memory</h1>
      <p>
        Get points by clicking on a pokemon, but don&lsquo;t click on any more
        than once!
      </p>
      <div className="buttons-container">
        <button onClick={chooseMode}>Easy</button>
        <button onClick={chooseMode}>Medium</button>
        <button onClick={chooseMode}>Hard</button>
      </div>
    </>
  );
}

export default MainMenu;
