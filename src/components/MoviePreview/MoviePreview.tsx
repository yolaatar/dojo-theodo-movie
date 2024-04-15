import styles from "./MoviePreview.module.css";

const MoviePreview = () => {
  const goToMovieDetails = () => {
    // A DEFINIR EXPERT
  };

  return <div className={styles.movieCard} onClick={goToMovieDetails}></div>;
};

export default MoviePreview;
