import { API_URLS } from "../../api/apiUrls";
import { Pokemon } from "../../types/Pokemon";
import { PokemonType } from "../../types/PokemonTypes";
import { POKEMON_TYPES } from "../../utils/constants";
import { addDefaultSrc } from "../../utils/helperFunctions";
import { PokemonStatsChart } from "../Stats";
import { TypeItemsList } from "../TypeItemsList";

type Props = {
  pokemon: Pokemon;
  pokemonId: string;
  closeModal: () => void;
};

export const PokemonInfoModal: React.FC<Props> = ({
  pokemon,
  pokemonId,
  closeModal,
}) => {
  const { name, types, height, weight, stats, moves } = pokemon;
  const mainType = types ? types[0].type.name : "unknown";
  const pokemonMainTypeColor = POKEMON_TYPES[mainType as PokemonType];

  return (
    <>
      <div className="flex items-center py-2 text-2xl cursor-pointer">
        <button
          type="button"
          onClick={closeModal}
          className="focus:outline-none">
          <i className="fa-solid fa-arrow-left p-1" />
        </button>
        <h1 className="modal-name">{name}</h1>
      </div>
      <div className="my-2 flex-center flex-col">
        <div className="w-full flex-center flex-col">
          <img
            src={`${API_URLS.pokemonImage}${pokemonId}.png`}
            onError={addDefaultSrc}
            alt={name}
            loading="lazy"
            className="w-full object-cover max-w-[200px]"
          />
          <div className="flex justify-center">
            <TypeItemsList types={types} />
          </div>
          <p
            className="text-xl pt-2"
            style={{
              color: pokemonMainTypeColor,
            }}>
            About
          </p>
          <div className="modal-main-stats">
            <div className="flex-column-centered">
              <div className="flex items-center">
                <img
                  src="images/straighten.png"
                  alt="weight icon"
                  className="w-6 h-5"
                />
                {`${height / 10} m`}
              </div>
              <div className="small-header">Height:</div>
            </div>
            <div className="relative">
              <div className="stats-modal" />
            </div>
            <div className="flex-column-centered">
              <div className="small-header pt-1">
                <i className="fa-solid fa-bolt pr-1 text-black" />
                Total Moves: <span className="text-black">{moves.length}</span>
              </div>
            </div>
            <div className="relative">
              <div className="stats-modal" />
            </div>
            <div className="flex-column-centered">
              <div className="flex items-center">
                <img
                  src="images/weight.png"
                  alt="weight icon"
                  className="w-6 h-5"
                />
                {`${weight / 10} kg`}
              </div>
              <div className="small-header">Weight:</div>
              <div className="relative">
                <div className="stats-modal" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p
            className="text-xl"
            style={{
              color: pokemonMainTypeColor,
            }}>
            Base Stats
          </p>
          <PokemonStatsChart
            stats={stats}
            color={pokemonMainTypeColor}
          />
        </div>
      </div>
    </>
  );
};
