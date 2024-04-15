import styles from "./MovieCatalog.module.css";

import GenreList from "../GenreList/GenreList";

export const MovieCatalog = () => {
  return (
    <>
      <GenreList />
      <div className={styles.layout}></div>
    </>
  );
};
