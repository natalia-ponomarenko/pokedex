import React from "react";
import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  list: Pokemon[] | undefined;
};

export const PokemonList: React.FC<Props> = ({ list }) => {
  const [currentItems, setCurrentItems] = useState<Pokemon[] | []>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (list) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(list.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(list.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, list]);

  const handlePageClick = (event: { selected: number }) => {
    if (list) {
      const newOffset = (event.selected * itemsPerPage) % list.length;
      setItemOffset(newOffset);
    }
  };

  const shouldRenderPagination = list && list.length > itemsPerPage;

  return (
    <>
      <div className="flex flex-wrap justify-center py-2 will-change-transform scroll-container">
        {currentItems.map((pokemon: Pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      {shouldRenderPagination && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-between"
          pageLinkClassName="flex items-center justify-center p-1 m-1 h-8 w-10 rounded border border-red-600 text-white bg-red-600 text-lg"
          previousClassName=""
          nextLinkClassName=""
          activeLinkClassName="bg-juicy-red text-xl"
        />
      )}
    </>
  );
};
