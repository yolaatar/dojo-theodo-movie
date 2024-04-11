import styles from "./MovieCatalog.module.css";

import GenreList from "../GenreList/GenreList";
import { useInfiniteQuery } from "react-query";
import { getMovies, searchMovies } from "../../services/movieService";
import { useEffect } from "react";
import { getFavorites } from "../../services/favoritesService";
import { useMovieContext } from "../../context/MovieContext";
import MoviePreview from "../MoviePreview/MoviePreview";

export const MovieCatalog = () => {
  const { selectedGenres, search } = useMovieContext();
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["getPopularMovies", selectedGenres, search],
    queryFn: ({ pageParam = 1 }) => {
      if (search) {
        return searchMovies(pageParam, search);
      }
      return getMovies(pageParam, selectedGenres);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const movies = data?.pages.flat() || [];

  const favoriteMovies = getFavorites();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movies, fetchNextPage]);

  return (
    <>
      <GenreList />
      <div className={styles.layout}>
        {!isLoading &&
          movies.map((movie) => (
            <MoviePreview
              key={movie.id}
              isFavorite={favoriteMovies.includes(movie.id)}
              movie={movie}
            />
          ))}

        {isLoading && <div>Chargement...</div>}
      </div>
    </>
  );
};
