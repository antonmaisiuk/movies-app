import React from "react";
import {Link, useNavigate} from "react-router-dom";
// Styles
import {Image, StyledMovieItem} from "./Thumbnail.styles";
import Like from "../Like/Like";

// Types
type Props = {
  image: string;
  movieId?: number;
  userId?: number;
  clickable: boolean;
  movieHeight?: boolean;
}

const Thumbnail: React.FC<Props> = ({image, movieId, userId,  clickable, movieHeight}) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {clickable ? (
        <>
          <StyledMovieItem>
            <Image onClick={() => navigate(`/${movieId}`)} src={image} alt="movie-thumb" movieHeight={movieHeight}/>
            {userId? <Like userId={userId} movieId={movieId || 0}/>: ``}

          </StyledMovieItem>
        </>
      ) : (
        <Image src={image} alt="movie-thumb" movieHeight={movieHeight}/>
      )}
    </React.Fragment>
  );
};

export default Thumbnail;
