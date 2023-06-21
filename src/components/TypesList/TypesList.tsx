import { useQuery } from "@tanstack/react-query";
import { getPokemonTypes } from "../../api/pokemon";
import { Error } from "../Error";
import { TypeButton } from "../buttons/TypeButton";

type Props = {
  setFilter: (filter: string) => void;
};

export const TypesList: React.FC<Props> = ({ setFilter }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["types"],
    queryFn: getPokemonTypes,
  });

  return (
    <div className="flex my-4 mx-auto px-5 max-w-4xl">
      {isLoading && <p>Loading types...</p>}
      {isError && <Error text="Ooops! Types weren't fetched" />}
      {data && (
        <div className="flex flex-wrap justify-center items-center">
          {data.results.map((type) => (
            <TypeButton
              key={type.name}
              name={type.name}
              setFilter={setFilter}
            />
          ))}
        </div>
      )}
    </div>
  );
};
