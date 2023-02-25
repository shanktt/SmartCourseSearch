import React from 'react';
import styled from 'styled-components'
import Link from "next/link";

const Container = styled.nav`
  height: 80px;
  background-color: #0C0D0F;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #9340E9;
  justify-content: center;
`

const Logo = styled(Link)`
  font-family: var(--font-b);
  font-weight: 500;
  font-size: 50px;
  color: #fff;
`

function Navbar(props) {
    return (
        <Container><Logo href={'/'}>That&apos;s a Course?!</Logo></Container>
    );
}

export default Navbar;