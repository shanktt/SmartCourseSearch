import React from 'react';
import styled from 'styled-components'
import Link from "next/link";

const Container = styled.nav`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 880px;
`

const Logo = styled(Link)`
  font-family: var(--font-open);
  font-weight: 500;
  font-size: 50px;
  color: #000;
  
  border-bottom: 3px solid #000;

`

function Navbar(props) {
    return (
        <Container><Logo href={'/'}>That&apos;s a Course?!</Logo></Container>
    );
}

export default Navbar;