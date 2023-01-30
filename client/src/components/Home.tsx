import React, { useEffect, useState } from "react";

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config/config";

// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumbnail from "./Thumbnail";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";


// Hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

// Image: if API fails to render image then the fallback image used this one
import NoImage from "../images/no_image.jpg";
import { StyledSortBlock } from "./styled";
import {Content, Wrapper } from "./styled";



const sortResults = (results: any[], sortOrder: string) => {
  return [...results].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.vote_average - b.vote_average;
    } else {
      return b.vote_average - a.vote_average;
    }
  });
};

const Home: React.FC = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();
  const [sortedResults, setSortedResults] = useState<any[]>([]);
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    if (state.results.length) {
      setSortedResults(sortResults(state.results, sortOrder));
    }
  }, [state.results, sortOrder]);

  const handleSort = (order: string) => {
    setSortOrder(order);
    setSortedResults(sortResults(state.results, order));
  };

  if (error) {
    return <h1>Something Went Wrong...</h1>;
  }
  return (
    <React.Fragment>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}

      <SearchBar setSearchTerm={setSearchTerm}>
      </SearchBar>

      <Wrapper>
        <Content>
      <StyledSortBlock>
        <button onClick={() => handleSort('asc')}>Sort by lowest rate</button>
        <button onClick={() => handleSort('desc')}>Sort by highest rate</button>
      </StyledSortBlock>
        </Content></Wrapper>


      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {sortedResults.map(movie => (
          <Thumbnail
            key={movie.id}
            clickable
            userId={userId}
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

      {loading && <Spinner />}

      {state.page < state.total_pages && !loading && (
        <Button callback={() => setIsLoadingMore(true)}>Load More</Button>
      )}



    </React.Fragment>

  );
};
export default Home;
