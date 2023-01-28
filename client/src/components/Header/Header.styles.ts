import styled from "styled-components";

export const Wrapper = styled.div`
background-color: #4CAF50; 
    padding: 0 20px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    padding: 20px 0;
    margin: 0 auto;
`;

export const LogoImg = styled.img`
    width: 200px;
    @media screen and (max-width: 500px){
        width: 150px;
    }
`;

export const StyledButton = styled.button`
  color: white;
  font-size: 25px;
  padding: 10px;
  border: none;
  background-color: transparent;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;

  &:hover {
    color: #dcdada;
  }
`;

export const TMDBLogoImg = styled.img`
    width: 100px;
    @media screen and (max-width: 500px){
        width: 80px;
    }
`;


