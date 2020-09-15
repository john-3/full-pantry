import React from 'react';
import styled from 'styled-components';

const IngredientCard = styled.div`
  padding: 10px;
  border: 1px solid;
  background-color: white;
`;

const Ingredient = ({ ingredient }) => {
  const { name } = ingredient
  return <IngredientCard>{name}</IngredientCard>;
};

export default Ingredient;
