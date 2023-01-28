import React, {FC, useState} from 'react';
import {Wrapper} from '../Grid/Grid.styles';
import {About, PageTitle} from './styled';
import {Movie} from "../../API/API";
import {log} from "util";

type Props ={
  movies: Movie[];
  userId: string;
}

const fetchData = async (userId: string) => {
  const response = await fetch('http://localhost:5000/api/like/' + userId, {
    method: 'GET',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    // body: JSON.stringify({
    //   movieId: movieId,
    //   userId: userId,
    // }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    console.log(error);
  }
}

const Account :FC<Props> = ({userId, movies}) => {
  const [user, setUser] = useState(userId);

  const favoriteMovies: number[] = [];
  fetchData(user).then(r => (r.movies.map((movie:number)=> favoriteMovies.push(movie))));
  // const [favoriteMovies, setFavoriteMovies] = useState([]);
  // setFavoriteMovies(await fetchData(user));
  console.log('FAV: ',favoriteMovies);
  console.log(movies);
  const movieList = movies.filter((movie) => favoriteMovies.map((favMovie: number) => favMovie === movie.id));
  console.log('### MOVIE LIST: ', movieList);
  // const getFavoriteMovies = async() => {await fetchData(userId);}
  return (
    <Wrapper>
      <div>
        <PageTitle>Welcome to Your Personal Account</PageTitle>
        <About>
          <h2>About you</h2>
          {/*<span><p>Name: </p>{user.name}</span>*/}
          {/*<span><p>Email: </p>{user.email}</span>*/}
        </About>
        {/*{movies.filter((movie) => favoriteMovies.map((favMovie: number) => favMovie === movie.id))}*/}
        {/*{movies.map((movie) => <div>movie</div>)}*/}
        {movieList.map((movie) => <div>${movie}</div>)
        }
      </div>
    </Wrapper>

  );
};

export default Account;
