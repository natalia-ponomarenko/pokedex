import { Pokemon, PokemonTypeIndividual } from "../types/Pokemon";

const toggleMultipleClasses = (el: HTMLElement, ...cls: string[]) =>
  cls.map((cl) => el.classList.toggle(cl));

export const filterByType = (
  typeName: string,
  filterList: string[],
  listOfPokemons: Pokemon[] | undefined
) => {
  const updatedFilterList = filterList.includes(typeName)
    ? filterList.filter((item) => item !== typeName)
    : [...filterList, typeName];

  const filterButton = document.getElementById(typeName);
  if (filterButton) {
    toggleMultipleClasses(filterButton, "outline", "outline-yellow-500");
  }

  const filteredData = listOfPokemons?.filter((pokemon) =>
    pokemon.types.some((pokemon: PokemonTypeIndividual) =>
      updatedFilterList.includes(pokemon.type.name.toLowerCase())
    )
  );

  return { filteredData, updatedFilterList };
};

export const filterByQuery = (
  userQuery: string,
  list: Pokemon[] | undefined
) => {
  if (!userQuery) {
    return list;
  }

  const preparedQuery = userQuery.toLowerCase().trim();

  const filteredData = userQuery
    ? list?.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().startsWith(preparedQuery)
      )
    : list;

  return filteredData;
};

export const addDefaultSrc = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = "images/Poke_ball.png";
};

export const resetFilters = () => {
  const filterActiveButtons = [
    ...document.querySelectorAll(".outline-yellow-500"),
  ];

  filterActiveButtons.forEach((button) => {
    const clickEvent = new Event("click");

    button.dispatchEvent(clickEvent);
    button.classList.remove("outline", "outline-yellow-500");
    return button;
  });
};
