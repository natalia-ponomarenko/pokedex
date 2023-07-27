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

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const updateURLParams = (name?: string) => {
  const params = new URLSearchParams(window.location.search);

  name
    ? params.set('pokemon', name)
    : params.delete('pokemon');

  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
};
