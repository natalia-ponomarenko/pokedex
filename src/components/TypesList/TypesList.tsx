import { useQuery } from "@tanstack/react-query";
import { getPokemonTypes } from "../../api/pokemon";
import { pokemonTypes } from "../../helpers/constants";
import { PokemonType } from "../../types/PokemonTypes";
import { Error } from "../Error";

type Props = {
  filter: (name: string) => void;
};

export const TypesList: React.FC<Props> = ({ filter }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["types"],
    queryFn: getPokemonTypes,
  });

  return (
    <div className="flex my-8 mx-auto px-5 max-w-4xl">
      {isLoading && <p>Loading types...</p>}
      {isError && <Error text="Ooops! Types weren't fetched" />}
      {data && (
        <div className="flex flex-wrap justify-center items-center">
          {data.results.map((type) => (
            <button
              key={type.name}
              id={type.name}
              onClick={() => {
                filter(type.name)
              }}
              style={{
                backgroundColor: pokemonTypes[type.name as PokemonType],
              }}
              className="py-1 m-1 w-16 rounded text-sm font-semibold text-white"
            >
              {type.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
