import React, { useState } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
// Components
import Ingredient from './Ingredient';

const StorageCard = styled(animated.div)`
  border: 1px solid black;
  border-radius: 1rem;
  width: 75%;
  margin: 2rem auto;
  height: 75vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isOpen ? '#ccfff6' : '#ffde9f')};
`;

const StorageTitle = styled.h2``;

const Storage = (props) => {
  const { name, ingredients, onClick, style } = props;
  const [isOpen, setIsOpen] = useState(false);

  const renderIngredients = (ingredients) => {
    if (ingredients.length < 0) {
      return;
    }

    return ingredients.map((ingredient) => (
      <Ingredient key={ingredient.id} name={ingredient.name} />
    ));
  };

  const updateOpenCloseUI = (isOpen) => {
    return isOpen ? (
      <button onClick={() => setIsOpen(!isOpen)}>Close {name}</button>
    ) : (
      <p>Click to open</p>
    );
  };

  return (
    <StorageCard
      style={style}
      isOpen={isOpen}
      onClick={() => !isOpen && setIsOpen(!isOpen)}
    >
      <StorageTitle onClick={onClick}>{name}</StorageTitle>
      {isOpen && renderIngredients(ingredients)}
      {updateOpenCloseUI(isOpen)}
    </StorageCard>
  );
};

export default Storage;
