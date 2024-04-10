import styles from "./MovieList.module.css";

import GenreList from "../GenreList/GenreList";
import MovieCard from "../MovieCard/MovieCard";
import { useInfiniteQuery } from "react-query";
import { getPopularMovies } from "../../services/movieService";
import { useEffect } from "react";

export const MovieList = () => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["getPopularMovies"],
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const movies = data?.pages.flat() || [];

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
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};
