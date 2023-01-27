import React from "react";
import { Link } from "react-router-dom";
import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";
import { hover } from "@testing-library/user-event/dist/hover";

const Header:React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="rmdb-logo" />
        </Link>
        <Link style={{ color: "white", fontSize: "30px", fontFamily: "sans-serif"}} to="/Login">Log in</Link>
       <Link style={{ color: "white", fontSize: "30px", fontFamily: "sans-serif"}} to="/Registration">Sign in</Link>
        <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
      </Content>
    </Wrapper>
    
  );
};

export default Header;
