import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="bg-red-600 py-2 md:py-5 px-5 flex justify-between">
        <div className="flex items-center">
          <img src="images/pokeball_white-header.png" alt="pokeball white" className="mr-3 w-8 md:w-full" />
          <span className=" text-3xl md:text-5xl font-poppins font-bold text-white">
            <a href="https://pokeapi.co/" title="Poke api">Pokédex</a>
          </span>
        </div>
        <div className="flex">
          <Link to={`/collection`} className="flex items-center justify-center">
          <i className="fa-solid fa-heart text-white text-2xl"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};
