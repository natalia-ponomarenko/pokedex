import { useCallback, useContext } from "react";
import { Pokemon } from "../../types/Pokemon";
import { CollectionContext } from "../../components/CollectionProvider";

export const Collection: React.FC = () => {
  const context = useContext(CollectionContext);
  const { collection, setCollection } = context;

  const removePokemon = useCallback(
    (name: string) => {
      setCollection((prevCollection: Pokemon[]) =>
        prevCollection.filter((pokemon: Pokemon) => pokemon.name !== name)
      );
    },
    [setCollection]
  );

  return collection.length !== 0 ? (
    <div>
      {collection.map((pokemon: Pokemon) => {
        const { name } = pokemon;
        return (
          <div key={name}>
            <p>{name}</p>
            <button onClick={() => removePokemon(name)}>Remove</button>
          </div>
        );
      })}
    </div>
  ) : (
    <p>You haven't added any pokemons yet</p>
  );
};
