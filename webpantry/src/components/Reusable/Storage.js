import React, { useEffect } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
// Components
import Ingredient from './Ingredient';
import { lighten } from 'polished';

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
  background-color: ${(props) => (props.isOpen ? lighten(0.1, props.styles.backgroundColor) : props.styles.backgroundColor)};
`;

const StorageTitle = styled.h2``;

const Storage = (props) => {
  const { name, ingredients, onClick, styles, index, isOpen } = props;

  const renderIngredients = (ingredients) => {
    if (ingredients.length < 0) {
      return;
    }

    return ingredients.map((ingredient) => (
      <Ingredient ingredient={ingredient} />
    ));
  };

  const updateOpenCloseUI = (isOpen) => {
    return isOpen ? (
      <button onClick={() => onClick(index)}>Close {name}</button>
    ) : (
        <p>Click to open</p>
      );
  };

  useEffect(() => {
    renderIngredients(ingredients)
  }, [ingredients])

  return (
    <StorageCard
      styles={styles}
      isOpen={isOpen}
      onClick={() => !isOpen && onClick(index)}
    >
      <StorageTitle onClick={onClick}>{name}</StorageTitle>
      {isOpen && renderIngredients(ingredients)}
      {updateOpenCloseUI(isOpen)}
    </StorageCard>
  );
};

export default Storage;
