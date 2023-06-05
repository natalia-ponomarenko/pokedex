import React, {useState, createContext, ReactNode, SetStateAction, Dispatch} from 'react';
import { Pokemon } from '../../types/Pokemon';

type Props = {
  children: ReactNode;
};

type CollectionContextType = {
  collection: Pokemon[];
  setCollection: Dispatch<SetStateAction<Pokemon[]>>;
};

export const CollectionContext = createContext<CollectionContextType>({
  collection: [],
  setCollection: () => { console.warn("method is not implemented") },
});

export const CollectionProvider: React.FC<Props> = ({ children }) => {
  
  const [collection, setCollection] = useState<Pokemon[]>([]);

  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};
