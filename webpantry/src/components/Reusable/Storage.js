import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated as a, config } from 'react-spring';
// Components
import Ingredient from './Ingredient';
import { lighten } from 'polished';

const StorageCard = styled(a.div)`
  border: 1px solid black;
  border-radius: 1rem;
  width: 75%;
  margin: 0;
  height: 75vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isOpen ? lighten(0.1, props.styles.backgroundColor) : props.styles.backgroundColor)};
`;

const StorageTitle = styled.h2`
`;

const Storage = (props) => {
  const { name, ingredients, onClick, styles, index, isOpen } = props;

  const { opacity, marginTop, padding, transform, } = useSpring({
    opacity: isOpen ? 0 : 1,
    marginTop: isOpen ? -300 : -300,
    padding: isOpen ? 10 : 100,
    transform: isOpen ? 'scale(0)' : 'scale(2.5)',
    config: {
      delay: 1000,
    },
  })


  const renderIngredients = (ingredients) => {
    console.log(window.innerWidth);
    if (ingredients.length < 0) {
      return;
    }

    return ingredients.map((ingredient) => (
      <Ingredient ingredient={ingredient} />
    ));
  };

  const updateOpenCloseUI = (isOpen) => {
    return isOpen ? (
      <button onClick={() => onClick(index)} style={{ opacity: '78%', borderRadius: '20%' }}>X</button>
    ) : (
        <p></p>
      );
  };

  useEffect(() => {
    renderIngredients(ingredients)
  }, [ingredients])

  return (
    < StorageCard
      styles={styles}
      isOpen={isOpen}
      onClick={() => !isOpen && onClick(index)}
    >
      <div style={{ position: 'absolute', top: '0px', right: '0px', padding: '10px', }}>{updateOpenCloseUI(isOpen)}</div>
      <a.div style={{ opacity, marginTop, transform, config }}>
        <StorageTitle onClick={onClick}>{isOpen ? null : name}</StorageTitle>
      </a.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: window.innerWidth / 10 }}>
        {isOpen && (ingredients.map((ingredient) => (<a.div style={{ textAlign: 'center', padding, opacity: opacity.interpolate(i => 1 - i) }}><Ingredient ingredient={ingredient} /></a.div>)))}
      </div>
    </StorageCard >
  );
};

export default Storage;
