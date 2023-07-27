import React, { useCallback } from "react";
import { Pokemon } from "../../types/Pokemon";
import { Card } from "../Card";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ScrollToTopButton } from "../buttons/ScrollButton";
import { scrollToTop } from "../../utils/helperFunctions";
import { CARDS_PER_PAGE } from "../../utils/constants";

type Props = {
  list: Pokemon[] | undefined;
};

export const PokemonList: React.FC<Props> = ({ list }) => {
  const [currentItems, setCurrentItems] = useState<Pokemon[] | []>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  useEffect(() => {
    if (list) {
      const endOffset = itemOffset + CARDS_PER_PAGE;
      setCurrentItems(list.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(list.length / CARDS_PER_PAGE));
    }
  }, [itemOffset, list]);

  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      if (list) {
        const newOffset = (event.selected * CARDS_PER_PAGE) % list.length;
        setItemOffset(newOffset);
        scrollToTop();
      }
    },
    [list]
  );

  const shouldRenderPagination = list && list.length > CARDS_PER_PAGE;
  return (
    <>
      <div className="list-container">
        {currentItems.map((pokemon: Pokemon) => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
          />
        ))}
        <ScrollToTopButton />
      </div>
      {shouldRenderPagination && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-between"
          pageLinkClassName="pagination-element"
          previousClassName="pagination-element"
          nextClassName="pagination-element"
          activeLinkClassName="bg-white text-juicy-red"
        />
      )}
    </>
  );
};
