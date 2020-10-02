import React from 'react';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';

const HeaderTitle = styled.h1`
background-color: #808080;
margin: 0px;
color: #ccc;
`;

const NavigationList = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

const NavItem = styled.li`
display: inline-block;
a { 
  padding: 8px;
  text-decoration: none;
  color: #ccc;
  &:visited {
    background-color: transparent;
  }
  &:hover {
    background-color: #a9a9a9;
    color: #808080;
  }
}
`;


const Navigation = () => {

  return (
    <HeaderTitle>
      <NavigationList>
        <NavItem>
          <Link to='/'>
            Pantry
            </Link>
        </NavItem>
        <NavItem>
          <Link to='/inventory'>
            Inventory
            </Link>
        </NavItem>
        {/* <NavItem>
          <Link to='/add'>
            Add Item
            </Link>
        </NavItem>
        <NavItem>
          <Link to='/test'>
            Test
            </Link>
        </NavItem> */}
      </NavigationList>
    </HeaderTitle>
  );
}

export default Navigation;