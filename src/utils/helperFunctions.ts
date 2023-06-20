import { Pokemon } from "../types/Pokemon";

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
  event.currentTarget.src = "images/pokeball_small.png";
};

export const convertPokemonId = (number: number) => {
  let paddedString = String(number);

  while (paddedString.length < 3) {
    paddedString = "0" + paddedString;
  }

  return paddedString;
};
