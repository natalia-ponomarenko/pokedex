export const request = <T>(url: string): Promise<T> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Pokemons weren't loaded");
    }

    return response.json() as Promise<T>;
  });
