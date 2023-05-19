import { useQuery } from "@tanstack/react-query";
import { getPokemonTypes } from "../../api/pokemon";
import { PokemonApiResponse } from "../../types/PokemonApiResponse";
import { Loader } from "../Loader";

export const TypesList: React.FC = () => {
  const { data, status } = useQuery<PokemonApiResponse>({
    queryKey: ["types"],
    queryFn: getPokemonTypes,
  });

  return (
    <>
      {status === "loading" && <Loader />}
      <div className="flex">
        {data && (
          <>
            {data.results.map(({ name }) => (
              <p className="m-1">{name}</p>
            ))}
          </>
        )}
      </div>
    </>
  );
};
