import React, { useState, createContext, ReactNode, useEffect } from "react";
import { Pokemon } from "../../types/Pokemon";

type Props = {
  children: ReactNode;
};

type CollectionContextType = {
  collection: Pokemon[];
  setCollection: (collection: Pokemon[]) => void;
};

export const CollectionContext = createContext<CollectionContextType>({
  collection: [],
  setCollection: () => {
    console.warn("Context is not provided");
  },
});

export const CollectionProvider: React.FC<Props> = ({ children }) => {
  const [collection, setCollection] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedCollection = localStorage.getItem("pokemonCollection");
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    }
  }, []);

  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};
