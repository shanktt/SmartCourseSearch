import React, {useContext} from 'react';
import styled from 'styled-components'
import {GlobalContext} from "@/components/globalContext";
import Image from 'next/image'
import {Button} from "@cred/neopop-web/lib/components";

const Container= styled.div`
  padding: 10px 20px;
  background-color: #20252d;
  border-radius: 6px;
`

const SearchInput = styled.input`
  all: unset;
  color: #BA7F0D;
  flex: 1;
  height: 100%;
  font-size: 25px;
  margin-right: 10px;
`

const InputWithIcon = styled.div`
    display: flex;
  flex-direction: row;
  align-items: center;
  //height: 108px;
`

const StyledImage = styled(Image)`
    margin-right: 20px;
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
                    height={30}
                    width={30}
                    alt="Search Icon"
                    />
                <SearchInput type="text" onChange={setSearchQuery} value={query} placeholder={"Search Query"}/>
                <Button size={"big"} textStyle={{fontSize: 16, fontWeight: 600}} kind="elevated">Search</Button>
            </InputWithIcon>

        </Container>
    );
}

export default SearchField;