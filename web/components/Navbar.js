import React from 'react';
import styled from 'styled-components'
import Link from "next/link";

const Container = styled.nav`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @media (min-width: 900px) {
    width: 880px;
  }
 
`


const Logo = styled(Link)`
  //marin-top: 10px;
  font-family: var(--font-open);
  font-weight: 500;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  @media (min-width: 450px) {
    font-size: 30px;
  }
  @media (min-width: 650px) {
    margin-top: 0px;
    font-size: 50px;
  }
  @media (min-width: 900px) {
    margin-left: 0px;
  }
  font-size: 25px;
  color: #000;
  border-bottom: 3px solid #000;

`

function Navbar(props) {
    return (
        <Container><Logo href={'/'}>That&apos;s a Course?!</Logo></Container>
    );
}

export default Navbar;