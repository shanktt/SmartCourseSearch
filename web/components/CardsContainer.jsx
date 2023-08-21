import React, {useContext} from 'react';
import CourseCard from "@/components/CourseCard";
import styled from "styled-components";
import {GlobalContext} from "@/components/globalContext";

const Container = styled.div`
  @media (min-width: 900px) {
    flex-direction: column;
    display: flex;
    margin-top: 0px;
  }
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 15px;
  margin-top: 30px;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Spinner = styled.div`
  border: 6px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top: 4px solid black;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-top: 1em;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;


function CardsContainer(props) {
    const {searchResults, isSearching} = useContext(GlobalContext);
    return (
      <Container>
        {
            isSearching 
            ? (
                <CenteredWrapper>
                    <Spinner />
                </CenteredWrapper>
              ) 
            : searchResults.map((d, idx) => <CourseCard cardInfo={d} key={idx} />)
        }
      </Container>
    );
}

export default CardsContainer;