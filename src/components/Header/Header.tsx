import { Link } from "react-router-dom";
import { updateURLParams } from "../../utils/helperFunctions";

export const Header = () => {
  return (
    <header>
      <div className="header">
        <a
          href="https://pokeapi.co/"
          title="Poke api"
          className="flex items-center"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="images/pokeball_white-header.png"
            alt="pokeball white"
            className="mr-3 w-8 md:w-full"
          />
          <span className="header-text">Pokédex</span>
        </a>
        <div className="flex">
          <Link
            to={`/collection`}
            className="flex-center flex-col text-white"
            title="Personal collection"
            onClick={() => updateURLParams()}
          >
            <p className="text-lg hidden md:block">See caught</p>
            <i className="fa-solid fa-heart text-2xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};
