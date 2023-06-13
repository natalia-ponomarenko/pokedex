import React, { useState } from "react";
import { Icon } from "../Icon";

type Props = {
  setQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
};

export const Search: React.FC<Props> = ({ setQuery, setLoading }) => {
  const [value, setValue] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleButtonClick = () => {
    setQuery(value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setValue("");
    }, 1000);
  };

  return (
    <div className="relative mt-4">
      <input
        type="text"
        id="search-query"
        className="block box-border p-2.5 w-56 z-1 text-sm rounded focus:outline-none focus:ring-juicy-red focus:border-juicy-red border border-[#CCCCCC]"
        placeholder="Find a pokemon"
        value={value}
        onChange={handleInputValue}
      />
      <button
        type="submit"
        className="absolute top-0 left-[98%] p-2.5 text-sm font-medium text-white bg-red-600 rounded-r-lg border border-red-600 hover:bg-juicy-red"
        onClick={handleButtonClick}
        disabled={!value.length}
      >
        <Icon />
      </button>
    </div>
  );
};
