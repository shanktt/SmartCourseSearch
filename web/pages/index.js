import Head from 'next/head'
import styled, {keyframes} from 'styled-components'
import Navbar from "@/components/Navbar";
import SearchField from "@/components/SearchField";
import GlobalContextProvider from "@/components/globalContext";
import React from "react";
import FilterOptionsGenEds from "@/components/FilterOptionsGenEds";
import FilterOptionsCreditHours from "@/components/FilterOptionsCreditHours";
import CardsContainer from "@/components/CardsContainer";
import SearchDescription from "@/components/SearchDescription";
const gradientKeyframes = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const Main = styled.main`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  background: linear-gradient(-45deg, #85d4ef, #8ff6de, #ef9c82, #f59ec0 );
  background-size: 400% 400%;
  animation: ${gradientKeyframes} 300s ease infinite;
  display: flex;
  flex-direction: column;
  @media (min-width: 900px) {
    align-items: center;
  }
`
const SearchMenuContainer = styled.div`
    padding-bottom: 20px;
  border-bottom: 2px solid black;
    
`

const ShowOptions = styled.div`
  span {
    text-decoration: underline;
  }
  @media (min-width: 800px) {
    font-size: 16px;
    margin-top: 15px;
  }
 
  margin-top: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 300;
  font-weight: 300;
`


const PageContainer = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  @media (min-width: 900px) {
    width: 880px;
  }
  
`

const SelectContainer = styled.div`
  display: flex;
  margin-left: 20px;
  flex: 1;
`
const GenEdsFilterContainer = styled.div`
  width: 70%;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const CreditHoursFilterContainer = styled.div`
  width: 30%;

  @media (max-width: 768px) {
    width: 50%;
  }
`;


export default function Home() {


  return (
    <>
      <Head>
        <title>That&apos;s a Course?! </title>
        <meta name="description" content="Discover and explore a wide range of courses offered at UIUC with our semantic search engine. From social justice and environmental sustainability to emerging technologies and creative expression, our webapp helps you find unique and engaging courses that match your interests and passions. Search by keyword, topic, or instructor and get detailed course descriptions, schedules, and enrollment information. Find your next adventure in learning with UIUC's comprehensive course catalog, now at your fingertips."/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons8-search-48.svg" />
      </Head>
      <Main>
          <GlobalContextProvider>
          <Navbar />
          <PageContainer>
              <SearchMenuContainer>
                  <SearchDescription/>
                  <SearchField />
                  <ShowOptions>
                      <span>
                        Refine Search:
                      </span>
                      <SelectContainer>
                        <GenEdsFilterContainer>
                          <FilterOptionsGenEds />
                        </GenEdsFilterContainer>
                        <CreditHoursFilterContainer>
                          <FilterOptionsCreditHours />
                        </CreditHoursFilterContainer>
                      </SelectContainer>
                  </ShowOptions>
              </SearchMenuContainer>
              <CardsContainer/>
              <br/>
              <br/>
          </PageContainer>
          </GlobalContextProvider>
      </Main>
    </>
  )
}
