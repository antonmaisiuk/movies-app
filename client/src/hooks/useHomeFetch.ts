import { useState, useEffect } from "react";
// API
import API, {Movie} from "../API/API";
// Helpers
import { isPersistedState } from "../helpers/helpers";

const intialState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const userId = Number(localStorage.getItem('userId'));
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(intialState);
  const [favMovies, setFavMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page:number, searchTerm = "") => {
    try {
      setEror(false);
      setLoading(true);
      const movies = await API.fetchMovies(searchTerm, page);
      console.log(movies);
      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setEror(true);
    }
    setLoading(false);
  };

  const fetchFavoriteMovies = async (userId: number) => {
    const response = await fetch('http://localhost:5000/api/like/' + userId, {
      method: 'GET',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
    if (response.ok) {
      const result: Movie[] = [];
      const favMovies = await response.json();
      favMovies.movies.map(async (movie: string) => {
        result.push(await API.fetchMovie(movie));
      });
      // console.log(result);
      setFavMovies(result);
    } else {
      const error = await response.json();
      console.log(error);
      return [];
    }
  }

  // useEffect(() =>{
  //   fetchFavoriteMovies(userId);
  // })

  useEffect(() => {
    fetchMovies(1);
    fetchFavoriteMovies(userId);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        setState(sessionState);
        return;
      }
    }
    setState(intialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) {
      return;
    }
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (!searchTerm) {
      return sessionStorage.setItem("homeState", JSON.stringify(state));
    }

  }, [searchTerm, state]);

  return { state, favMovies, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
