import client from "../providers/client";

const API_KEY = "8f2b0507073cf879fe022e328d8659c9";
const LANGUAGE = "pt-BR";

export const popularMovies = () => {
  return client.get(`/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`);
};
export const searchItem = (item) => {
  let movie = item;
  let movieEncoded = encodeURI(movie);
  return client.get(
    `/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${movieEncoded}`
  );
};
