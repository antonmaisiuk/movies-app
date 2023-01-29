import React, {FC, useEffect, useState} from 'react';
import {Wrapper} from '../Grid/Grid.styles';
import {PageTitle} from './styled';
import {Movie} from "../../API/API";
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config/config";
import NoImage from "../../images/no_image.jpg";
import Thumbnail from "../Thumbnail";
import Grid from "../Grid";
import axios from "axios";
import {useHomeFetch} from "../../hooks/useHomeFetch";

type Props = {
  movies: Movie[];
  userId: string;
}


const Account: FC<Props> = ({userId, movies}) => {
  const { state} =
    useHomeFetch();
  const [favMovies, setFavMovies] = useState<number[]>([]);



  useEffect(() => {
    const fetchFavoriteMovies = async (userId: string) => {
      const response = await axios.get('http://localhost:5000/api/like/' + userId, {
        method: 'GET',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
      });

      const favMovies = await response.data;
      setFavMovies(favMovies.movies);
    }


      fetchFavoriteMovies(userId);
    // }
    console.log('FAVS AFTER EFF: ', favMovies);
  },[])

  console.log(favMovies);
  const list = state.results.filter((movie) => favMovies.includes(movie.id));
  console.log(list);

  return (
    <Wrapper>
      <div>
        <PageTitle>Welcome to Your Personal Account</PageTitle>

        <Grid header={"Your Favorite Movies"}>
          {list.map((movie) =>(
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
            ))}
        </Grid>
      </div>
    </Wrapper>
  );
};

export default Account;
