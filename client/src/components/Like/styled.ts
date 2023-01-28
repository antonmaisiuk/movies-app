import styled from "styled-components";

export const StyledLike = styled.span`
  position: absolute;
  //bottom: 0;
  //left: 0;
  //width: 100%;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  -webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;
  background-color: #fff;
  background-image: url('https://img.icons8.com/ios-glyphs/30/40C057/following.png');
  //text-align: center;
  //background-color: #4CAF50;
  //border-bottom-right-radius: 20px;
  //border-bottom-left-radius: 20px;
  
  &:hover{
    opacity: 0.7;
  }
  //&:active{
  //  background-color: red;
  //}
`;
