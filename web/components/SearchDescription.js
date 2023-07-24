import React, {useContext} from 'react';
import styled from "styled-components";
import {Button} from "@cred/neopop-web/lib/components";
import {GlobalContext} from "@/components/globalContext";

const HelpQuery = styled.div`
    display: flex;
  align-items: center;
  gap: 10px;
  @media (min-width: 400px) {
    font-size: 16px;
  }
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 10px;
  flex-wrap: wrap;
`

const demoQueries = [
    {query: "Involves fieldwork or outdoor activities", genEdOptions: [{ value: 'Natural Sciences & Technology', label: 'Natural Sciences & Technology' }], creditHourOptions: []},
    {query: "talks about social justice and inequality", genEdOptions: [{ value: 'Advanced Composition', label: 'Advanced Composition' }], creditHourOptions: []},
    {query: "explore the intersection of technology and society", creditHourOptions: [{ value: 3, label: '3 Credit' }], creditHourOptions: []},
    {query: "food and cooking in different cultures and societies", genEdOptions: [{ value: 'Cultural Studies', label: 'Cultural Studies' }], creditHourOptions: []},
    {query: "cultural and historical significance of fashion and textiles", genEdOptions: [], creditHourOptions: []}
]

function SearchDescription(props) {
    const {setQuery, setFilterOptions, setFilterOptionsCreditHours} = useContext(GlobalContext)
    const setRandomQuery = () => {
        let randInt = Math.floor(Math.random() * 5);
        setQuery(demoQueries[randInt]['query'])
        setFilterOptions(demoQueries[randInt]["genEdOptions"])
        setFilterOptionsCreditHours(demoQueries[randInt]["creditHourOptions"])
    }


    return (
        <HelpQuery>
                      <span>
                          Search UIUC courses for any interest
                      </span>
            <Button onClick={setRandomQuery} size={"small"} spacingConfig={{padding: '5px 5px'}} textStyle={{fontSize: '12px', fontWeight: 400}} kind="flat">surprise me</Button>
        </HelpQuery>
    );
}

export default SearchDescription;