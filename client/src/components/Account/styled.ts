import styled from "styled-components";

export const PageTitle = styled.h1`
  color: #000;
  font-size: 50px;
  font-family: sans-serif;
`;
export const About = styled.div`
  margin: 15px 0;
  color: #000;
  font-family: sans-serif;
  font-size: 18px;
  h2{
    margin-bottom: 10px;
    font-size: 30px;
  }
  p{
    color: #000;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const StyledFavoritesMovies = styled.div`
  display: flex;
  //height: 150px;
  span{
    margin-right: 10px;
  }
  span:last-child{
    margin-right: 0;
  }
  span > img{
    //width: auto;
    height: 250px;
  }
`;
