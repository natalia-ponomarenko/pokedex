import React from "react";
import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card";
import { FixedSizeGrid as Grid } from "react-window";

type Props = {
  list: Pokemon[] | undefined;
};

export const PokemonList: React.FC<Props> = ({ list }) => {
  const columnCount = Math.floor(window.innerWidth / 350);
  const rowCount = list ? Math.ceil(list.length / columnCount) : 0;

  const itemRenderer = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    let item;
    if (list) {
      item = list && list[index];
    }

    return (
      <div style={style}>{item && <Card key={item.name} pokemon={item} />}</div>
    );
  };

  {
    /* // // <div className="flex flex-wrap justify-center py-2 will-change-transform scroll-container"></div>*/
  }
  return (
    <div className="sm:max-w-xs md:max-w-[1000px] mx-auto text-center">
      <Grid
        width={window.innerWidth}
        height={window.innerHeight}
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={250}
        rowHeight={350}
      >
        {itemRenderer}
      </Grid>
    </div>
  );
};
