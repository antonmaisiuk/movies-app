import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Wrapper, Content, LogoImg, TMDBLogoImg, StyledButton} from "./Header.styles";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";
import {hover} from "@testing-library/user-event/dist/hover";

const Header: React.FC = () => {

  const authToken = localStorage.getItem('jwt');
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="rmdb-logo"/>
        </Link>
        {authToken ?
          <StyledButton onClick={()=> navigate('/account')}>Account</StyledButton> :
          <StyledButton onClick={()=> navigate('/login')}>Log in</StyledButton>}

        {/* <Link style={{ color: "white", fontSize: "30px", fontFamily: "sans-serif"}} to="/login">Log in</Link>*/}
        {/*<Link style={{ color: "white", fontSize: "30px", fontFamily: "sans-serif"}} to="/registration">Sign in</Link>*/}
        {/* <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />*/}
      </Content>
    </Wrapper>

  );
};

export default Header;
