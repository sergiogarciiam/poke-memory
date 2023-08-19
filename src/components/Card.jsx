import PropTypes from "prop-types";

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

Card.propTypes = {
  pokemon: PropTypes.object.isRequired,
  getNewBoard: PropTypes.func.isRequired,
  setFinishResult: PropTypes.func.isRequired,
};

export default Card;
