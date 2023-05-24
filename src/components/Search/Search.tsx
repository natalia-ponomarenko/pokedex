import React from "react";

type Prop = {
  filterValue: string;
  handleFilter: React.Dispatch<React.SetStateAction<string>>; 
};

export const Search: React.FC<Prop> = ({ filterValue, handleFilter}) => {
  return (
    <div>
      <input
        type="text"
        id="search-query"
        className="w-56 h-[38px] px-4 mx-1 text-sm rounded focus:outline-none border border-[#CCCCCC]"
        placeholder="Start filter the pokemons!"
        value={filterValue}
        onChange={({ currentTarget: { value } }) => handleFilter(value)}
      />
    </div>
  );
};
