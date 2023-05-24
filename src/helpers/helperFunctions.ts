import { Pokemon, PokemonTypeIndividual } from "../types/Pokemon";

export const filterByType = (
  typeName: string,
  filterList: string[],
  setFilterList: React.Dispatch<React.SetStateAction<string[]>>,
  listOfPokemons: Pokemon[] | undefined,
  handleData: React.Dispatch<React.SetStateAction<Pokemon[] | undefined>>
) => {
  const updatedFilterList = filterList.includes(typeName)
    ? filterList.filter((item) => item !== typeName)
    : [...filterList, typeName];

  setFilterList(updatedFilterList);

  if (!updatedFilterList.length) {
    handleData(listOfPokemons);
    return;
  }

  const filteredData = listOfPokemons?.filter((pokemon) =>
    pokemon.types.some((pokemon: PokemonTypeIndividual) =>
      updatedFilterList.includes(pokemon.type.name.toLowerCase())
    )
  );
  handleData(filteredData);
};
