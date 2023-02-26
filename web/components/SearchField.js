import React, {useContext} from 'react';
import styled from 'styled-components'
import {GlobalContext} from "@/components/globalContext";
import Image from 'next/image'
import {Button} from "@cred/neopop-web/lib/components";

const Container= styled.div`
  padding: 5px 10px;
  @media (min-width: 800px) {
    padding: 10px 20px;
  }
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid black;
`

const SearchInput = styled.input`
  all: unset;
  color: #000;
  flex: 1;
  height: 100%;
  @media (min-width: 800px) {
    font-size: 25px;
  }
  font-size: 20px;
  margin-right: 10px;
`

const InputWithIcon = styled.div`
    display: flex;
  flex-direction: row;
  align-items: center;
  //height: 108px;
`

const StyledImage = styled(Image)`
  @media (min-width: 800px) {
    margin-right: 20px;
  }
  margin-right: 10px;
`

function SearchField(props) {
    const {query, setQuery} = useContext(GlobalContext)




    const setSearchQuery = (e) => {
        console.log(setQuery(e.target.value))
    }

    return (
        <Container>
            <InputWithIcon>
                <StyledImage
                    priority
                    src="/icons8-search-48.svg"
                    width={30}
                    height={30}
                    alt="Search Icon"
                    />
                <SearchInput type="text" onChange={setSearchQuery} value={query} placeholder={"Discover your next favorite course at U of I"}/>
                <Button size={"medium"} textStyle={{fontSize: 16, fontWeight: 600}} kind="elevated">Search</Button>
            </InputWithIcon>

        </Container>
    );
}

export default SearchField;