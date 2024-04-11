import React, { createContext, useState, useContext } from "react";

interface MovieContextType {
  search: string;
  setSearch: (search: string) => void;
  selectedGenres: number[];
  setSelectedGenres: (genres: number[]) => void;
}

export const MovieContext = createContext<MovieContextType>({
  search: "",
  setSearch: () => {},
  selectedGenres: [],
  setSelectedGenres: () => {},
});

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [search, setSearch] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  return (
    <MovieContext.Provider
      value={{
        search,
        setSearch,
        selectedGenres,
        setSelectedGenres,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for consuming context
export const useMovieContext = () => useContext(MovieContext);
