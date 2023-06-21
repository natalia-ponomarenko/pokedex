import { useContext } from "react";
import { CollectionContext } from "../../components/CollectionProvider";
import { PokemonList } from "../../components/PokemonList";
import { Link } from "react-router-dom";
import { ReturnButton } from "../../components/buttons/ReturnButton";

export const Collection: React.FC = () => {
  const context = useContext(CollectionContext);
  const { collection } = context;

  return (
    <div className="main-container">
      <div className="m-2">
        <Link to="/">
          <ReturnButton />
        </Link>
      </div>
      {collection.length !== 0 ? (
        <PokemonList list={collection} />
      ) : (
        <p className="py-4">You haven't added any pokemons yet</p>
      )}
    </div>
  );
};
