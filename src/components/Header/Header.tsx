import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
        <div className="bg-red-600 h-26 py-2 px-5 flex justify-between">
          <div className="w-[200px] object-cover">
            <a href="https://pokeapi.co/" className="cursor-pointer">
              <img src="images/pokemon-logo.png" alt="pokemon logo Catch em all!" />
            </a>
          </div>
          <div className="flex">
            <Link
              to={`/collection`}
              className="font-medium text-lg text-white flex flex-col md:flex-row items-center justify-center"
            >
              Your Collection
              <img src="images/pikachu.png" alt="pikachu" className="h-8 px-2" />
            </Link>
          </div>
        </div>
    </header>
  );
};
