import React, {FC, useEffect, useState} from 'react';
import {Wrapper} from '../Grid/Grid.styles';
import {About, PageTitle, StyledFavoritesMovies} from './styled';
import API, {Movie, Movies} from "../../API/API";
import {log} from "util";
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config/config";
import NoImage from "../../images/no_image.jpg";
import Thumbnail from "../Thumbnail";
import Grid from "../Grid";
import {useHomeFetch} from "../../hooks/useHomeFetch";

type Props = {
  movies: Movie[];
  userId: string;
}


const Account: FC<Props> = ({userId, movies}) => {
  // const { favMovies } = useHomeFetch();
  // const [user, setUser] = useState(userId);
  const [favMovies, setFavMovies] = useState<Movie[]>([]);
  // const [state, setState] = useState(false);


  useEffect(() => {
    // await fetchFavoriteMovies(userId);
    const fetchFavoriteMovies = async (userId: string) => {
      const response = await fetch('http://localhost:5000/api/like/' + userId, {
        method: 'GET',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        // body: JSON.stringify({
        //   movieId: movieId,
        //   userId: userId,
        // }),
      });
      if (response.ok) {
        const result: Movie[] = [];
        // console.log(await response.json());
        const favMovies = await response.json();
        favMovies.movies.map(async (movie: string) => {
          // console.log('MOVIE: ', await API.fetchMovie(movie));
          result.push(await API.fetchMovie(movie));
        });
        // console.log(result);
        // setState(true);
        setFavMovies(result);
      } else {
        const error = await response.json();
        console.log(error);
        return [];
      }
    }
    console.log('FAVS AFTER EFF: ', favMovies);
  })

  // const favoriteMovies: Movie[] = [];
  // fetchData(user).then(r => (r.map((movie:Movie)=> favoriteMovies.push(movie))));
  // const moviesInfo:Movie[] = [];
  // favoriteMovies.map(async (movie: string) => {
  //   console.log('MOVIE: ', await API.fetchMovie('45658'));
  //   moviesInfo.push(await API.fetchMovie('45658'));
  // });
  // console.log('FAV: ',favoriteMovies);
  // const [favoriteMovies, setFavoriteMovies] = useState([]);
  // setFavoriteMovies(await fetchData(user));
  // console.log('FAV: ',favoriteMovies);
  // console.log(movies);
  // favoriteMovies.forEach(async (favMovie) => {
  //   console.log('TETET');
  //   moviesInfo.push(await API.fetchMovie(favMovie));
  // });
  // setTimeout(()=>{}, 100);
  console.log('FAV', favMovies);
  // console.log(moviesInfo);
  // const movieList = movies.filter((movie) => favoriteMovies.map((favMovie: number) => favMovie === movie.id));
  // console.log('### MOVIE LIST: ', movieList);
  // const getFavoriteMovies = async() => {await fetchData(userId);}
  return (
    <Wrapper>
      <div>
        <PageTitle>Welcome to Your Personal Account</PageTitle>
        <h2>Your favorite movies</h2>
        {/*<StyledFavoritesMovies>*/}
        <Grid header={"Favorite Movies"}>
          {favMovies.map(movie => (
              // console.log('LOG MOVE: ', movie);
              // <div>${movie}</div>;
              <Thumbnail
                key={movie.id}
                clickable
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : NoImage
                }
                movieHeight={false}
                movieId={movie.id}
              />
            ))
          }
        </Grid>
        {/*</StyledFavoritesMovies>*/}


      </div>
    </Wrapper>

  );
};

export default Account;
