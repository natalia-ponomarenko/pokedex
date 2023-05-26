import { pokemonTypes } from "../../helpers/constants";
import { Pokemon } from "../../types/Pokemon";
import { PokemonType } from "../../types/PokemonTypes";

export const Card = ({ id, height, weight, name, types, moves }: Pokemon) => {
  const addDefaultSrc = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "../images/Poke_ball.png";
  };

  return (
    <div className="flex flex-col w-52 m-4 bg-white p-6 rounded text-sm">
      <div>
        <div className="flex justify-between">
          <div>
              <div>Height:</div>
              <div>{`${height / 10} m`}</div>
          </div>
          <div>
              <div>Weight:</div>
              <div>{`${weight / 100} kg`}</div>
          </div>
        </div>
        <div className="text-lg text-center text-slate-800 font-medium capitalize py-1
        ">{`${name}`}</div>
        <div className="">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            onError={addDefaultSrc}
            alt={name}
            className="w-40 h-40 object-cover"
          />
        </div>
        <div className="flex">
          {types.map((type) => (
            <div
              key={type.slot}
              className="flex w-min px-4 py-1 rounded m-1 font-medium"
              style={{
                backgroundColor: pokemonTypes[type.type.name as PokemonType],
              }}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <div>{`Total moves: ${moves.length}`}</div>
      </div>
    </div>
  );
};
