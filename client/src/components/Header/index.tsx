import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Wrapper, Content, LogoImg, TMDBLogoImg, StyledButton, ButtonBlock} from "./Header.styles";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";
import {hover} from "@testing-library/user-event/dist/hover";

const Header: React.FC = () => {

  const authToken = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <h1>Movies</h1>
          {/*<LogoImg src={RMDBLogo} alt="rmdb-logo"/>*/}
        </Link>
        {authToken ?
          <>
            <ButtonBlock>
              <StyledButton onClick={() => navigate('/account')}>Account</StyledButton>
              <StyledButton onClick={logOut}>Log Out</StyledButton>
            </ButtonBlock>
          </> :
          <StyledButton onClick={()=> navigate('/login')}>Log in</StyledButton>}

        {/* <Link style={{ color: "white", fontSize: "30px", fontFamily: "sans-serif"}} to="/login">Log in</Link>*/}
        {/*<Link style={{ color: "white", fontSize: "30px", fontFamily: "sans-serif"}} to="/registration">Sign in</Link>*/}
        {/* <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />*/}
      </Content>
    </Wrapper>

  );
};

export default Header;
