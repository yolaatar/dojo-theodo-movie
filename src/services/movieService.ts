import axios from "axios";
import { Genre, Movie } from "../models";

type TMDBResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

const BASE_URL_API = "https://api.themoviedb.org/3";
const API_KEY = "522d421671cf75c2cba341597d86403a";

const DEFAULT_SEARCH_PARAMS = {
  api_key: API_KEY,
  language: "fr-FR",
};

const generateTMDBUrl = (path: string, params: Record<string, string>) => {
  const url = new URL(`${BASE_URL_API}${path}`);
  url.search = new URLSearchParams({
    ...DEFAULT_SEARCH_PARAMS,
    ...params,
  }).toString();
  return url.toString();
};

const get = async <T>(url: string) => {
  const response = await axios.get<TMDBResponse<T>>(url);
  return response.data.results;
};

export const getPopularMovies = async (page: number): Promise<Movie[]> => {
  return await get<Movie>(
    generateTMDBUrl("/movie/popular", {
      page: page.toString(),
    })
  );
};

export const getFavoriteMoviesIds = async () => {
  const response = await axios.get<number[]>(
    `${BASE_URL_API}/favorite-movies-id`
  );
  return response.data;
};

export const getFavoriteMovies = async () => {
  const response = await axios.get<Movie[]>(`${BASE_URL_API}/favorite-movies`);

  return response.data;
};

export const getMovieById = async (movieId: string) => {
  const response = await axios.get<Movie>(`${BASE_URL_API}/movies/${movieId}`);
  return response.data;
};

export const toggleMovieFavoriteStatus = async (movieId: string) => {
  await axios.post(`${BASE_URL_API}/toggle-favorite/${movieId}`);
};

export const getGenres = async () => {
  const response = await axios.get<Genre[]>(`${BASE_URL_API}/genres`);
  return response.data;
};

export const searchMovies = async (searchText: string, page: number) => {
  const response = await axios.get<Movie[]>(
    `${BASE_URL_API}/search?pageNumber=${page}&searchText=${searchText}`
  );
  return response.data;
};
