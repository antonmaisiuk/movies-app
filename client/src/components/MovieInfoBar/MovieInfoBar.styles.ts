import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    min-height: 50px;
    background-color: #4CAF50; 
    padding: 0 20px;
`;
export const Content = styled.div`
    display: flex;
    color: var(--white);
    max-width: var(--maxWidth);
    margin: 0 auto;
    width: 100%;

    .column{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1A6B06;
        border-radius: 20px;
        margin: 0 20px;
        flex: 1;
        padding: 8px;

        :first-child{
            margin-left: 0;
        }
        :last-child{
            margin-right: 0;
        }
    }

    @media screen and (max-width: 768px){
        display: block;
        .column{
            margin: 20px 0;
        }
    }
`;