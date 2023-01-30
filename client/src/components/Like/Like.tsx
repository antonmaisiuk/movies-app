import React, {FC, useEffect, useState} from 'react';
import {StyledLike} from "./styled";
import axios from "axios";

type Props = {
  movieId: number;
  userId: number;
}

async function addFavorite (movieId: number, userId:number) {
  // console.log('CLIK LIKE! ', movieId, userId);

  const response = await fetch('http://localhost:5000/api/like', {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify({
      movieId: movieId,
      userId: userId,
    }),
  });
  if (response.ok) {
    const data = await response.json();
  } else {
    const error = await response.json();
  }
}

const Like: FC<Props> = ({movieId, userId}) => {
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


    fetchFavoriteMovies(userId.toString());
    // }
    // console.log('FAVS AFTER EFF: ', favMovies);
  },[])

  let isFavorite = 0;
  if (favMovies.includes(movieId)){
    isFavorite = 1;
  }
  // const isFavorite = favMovies.includes(movieId);
  return (
  <StyledLike  onClick={() => addFavorite(movieId, userId)}/>
  );
}

export default Like;
