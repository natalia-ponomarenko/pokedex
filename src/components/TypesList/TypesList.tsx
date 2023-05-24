import { useQuery } from "@tanstack/react-query";
import { getPokemonTypes } from "../../api/pokemon";
import { pokemonTypes } from "../../helpers/constants";
import { PokemonType } from "../../types/PokemonTypes";

type Props = {
  filter: (name: string) => void;
};

export const TypesList: React.FC<Props> = ({ filter }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["types"],
    queryFn: getPokemonTypes,
  });

  return (
    <>
      {isLoading && <p>Loading types...</p>}
      {isError && <p>Ooops! Types weren't fetched</p>}
      <div className="flex m-16">
        {data && (
          <>
            {data.results.map((type) => (
              <button
                key={type.name}
                id={type.name}
                onClick={() => filter(type.name)}
                style={{ backgroundColor: pokemonTypes[type.name as PokemonType] }}
              >
                {type.name}
              </button>
            ))}
          </>
        )}
      </div>
    </>
  );
};
