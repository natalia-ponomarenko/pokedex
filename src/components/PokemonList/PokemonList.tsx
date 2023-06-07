import { useRef } from "react";
import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card";
import { ViewportList } from "react-viewport-list";

type Props = {
  list: Pokemon[] | undefined;
};

export const PokemonList: React.FC<Props> = ({ list }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-wrap justify-center py-2" ref={ref}>
      <ViewportList viewportRef={ref} items={list}>
        {(item: Pokemon) => <Card key={item.name} pokemon={item} />}
      </ViewportList>
    </div>
  );
};
