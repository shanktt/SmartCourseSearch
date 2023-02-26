import React, {useContext} from 'react';
import styled from 'styled-components'
import {GlobalContext} from "@/components/globalContext";
import Image from 'next/image'
import {Button} from "@cred/neopop-web/lib/components";
import axios from "axios";

const Container= styled.div`
  //padding: 5px 10px;
  @media (min-width: 800px) {
    //padding: 10px 20px;
  }
`

const SearchInput = styled.input`
  all: unset;
  color: #000;
  height: 100%;
  @media (min-width: 600px) {
    font-size: 16px;
  }
  @media (min-width: 800px) {
    font-size: 20px;
  }
  flex: 1;
  
  font-size: 14px;
  margin-right: 10px;
`

const InnerContainer = styled.div`
    display: flex;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
  flex-direction: column;
  border-radius: 6px;
`

const StyledImage = styled(Image)`
  @media (min-width: 800px) {
    margin-right: 10px;
    margin-left: 10px;
  }
 padding: 2px;
  margin-right: 10px;
`
const InputWithIcon = styled.div`
  background-color: #ffffff;
  padding: 5px 0px;
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid black;
  height: 100%;
  border-radius: 3px;
  
`

function SearchField(props) {
    const {query, setQuery, filterOptions, setSearchResults} = useContext(GlobalContext)




    const setSearchQuery = (e) => {
        setQuery(e.target.value)
    }
    const getCourse = () => {
        axios.post('/api/get_courses', {
            query,
            filterOptions,
        }).then((res) => {
            let data = res.data
            setSearchResults(data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Container>
            <InnerContainer>
                <InputWithIcon>
                    <StyledImage
                        priority
                        src="/icons8-search-48.svg"
                        width={30}
                        height={30}
                        alt="Search Icon"
                    />
                    <SearchInput type="text" onChange={setSearchQuery} value={query} placeholder={"Involves fieldwork or outdoor activities"}/>

                </InputWithIcon>
                <Button onClick={getCourse} size={"medium"} textStyle={{fontSize: 16, fontWeight: 600}} kind="elevated">Search</Button>
            </InnerContainer>

        </Container>
    );
}

export default SearchField;