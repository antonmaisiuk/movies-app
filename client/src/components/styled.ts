import styled from "styled-components";

export const StyledSortBlock = styled.div`
  button {
    background-color: #4CAF50;
    color: #fff;
    padding: 8px;
    font-size: 15px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    border: 1px solid rgba(59, 59, 59, 0.23);
    &:first-child{
      margin-right: 10px;
    }
  }
`;
export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: flex-end;
`;
