import { useContext } from "react";
import { CollectionContext } from "../../components/CollectionProvider";
import { PokemonList } from "../../components/PokemonList";
import { Link } from "react-router-dom";

export const Collection: React.FC = () => {
  const context = useContext(CollectionContext);
  const { collection } = context;

  return (
    <div className="text-center">
      <Link to="/">
        <button type="button" className="bg-red-600 p-2 rounded text-white m-1">Back to list</button>
      </Link>
      {collection.length !== 0 ? (
        <PokemonList list={collection} />
      ) : (
        <p className="py-4">You haven't added any pokemons yet</p>
      )}
    </div>
  );
};
