function Card({ pokemon, getNewBoard, setFinishResult }) {
  const testPokemon = () => {
    if (!pokemon.click) getNewBoard(pokemon.name);
    else setFinishResult(true);
  };

  return (
    <div className="pokemon-card" onClick={testPokemon}>
      <img src={`${pokemon.image}`}></img>
      <h3>{pokemon.name}</h3>
    </div>
  );
}

export default Card;
