import React, {FC, useState} from 'react';
import {StyledLike} from "./styled";

type Props = {
  movieId: number;
  userId: number;
}

async function addFavorite  (movieId: number, userId:number) {
  console.log('CLIK LIKE! ', movieId, userId);

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

  return (
    <StyledLike onClick={() => addFavorite(movieId, userId)}/>
  );
}

export default Like;
