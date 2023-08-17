function MainMenu({ chooseMode }) {
  return (
    <>
      <h1 className="title">Poke Memory</h1>
      <p>Click cards but not repeat what you click</p>
      <div className="buttons-container">
        <button onClick={chooseMode}>Easy</button>
        <button onClick={chooseMode}>Medium</button>
        <button onClick={chooseMode}>Hard</button>
      </div>
    </>
  );
}

export default MainMenu;
