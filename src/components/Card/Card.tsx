import { pokemonTypes } from '../../helpers/constants';
import { Pokemon } from '../../types/Pokemon';

export const Card = ({
  id,
  height,
  weight,
  name,
  types,
  moves,
}: Pokemon) => {
  const addDefaultSrc = (event) => {
    event.target.src = '../images/Poke_ball.png'
  }

  return (
    <div className="card">
      <div
      >
        <div>
          <div>
            <span>
              <div>Height:</div>
              <div>{`${height / 10} m`}</div>
            </span>
          </div>
          <div>
            <span>
              <div>Weight:</div>
              <div>{`${weight / 100} kg`}</div>
            </span>
          </div>
        </div>
        <div>{`${name}`}</div>
        <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            onError={addDefaultSrc}
            alt={name}
          />
        </div>
        <div className="card__types">
          {types.map((type) => (
            <div
              key={type.slot}
              style={{ backgroundColor: pokemonTypes[type.type.name] }}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <div>
          {`Total moves: ${moves.length}`}
        </div>
      </div>
    </div>
  )
}
