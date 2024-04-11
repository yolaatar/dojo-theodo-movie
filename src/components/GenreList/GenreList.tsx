import { useQuery } from "react-query";
import { getGenres } from "../../services/movieService";
import styles from "./GenreList.module.css";
import { useMovieContext } from "../../context/MovieContext";

const GenreList = () => {
  const { data, isLoading } = useQuery("getGenres", getGenres);
  const { selectedGenres, setSelectedGenres, search } = useMovieContext();

  if (search) return null;
  if (isLoading) return <div>Chargement...</div>;

  const genres = data || [];

  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  return (
    <div className={styles.genreContainer}>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`${styles.genre} ${
            selectedGenres.includes(genre.id) ? styles.selected : ""
          }`}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreList;
