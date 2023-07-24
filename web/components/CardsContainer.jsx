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
`
function CardsContainer(props) {
    const {searchResults} = useContext(GlobalContext);
    return (
        <Container>
            {
                searchResults.map((d, idx)=> <CourseCard cardInfo={d} key={idx}/>)
            }

        </Container>
    );
}

export default CardsContainer;