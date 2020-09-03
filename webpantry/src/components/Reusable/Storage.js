import React from 'react';
import styled from 'styled-components';

const StorageCard = styled.div`
  border: 1px solid black;
  width: 100%;
`;

const StorageTitle = styled.h2``;

const Storage = (props) => {
  const { name, items, onClick } = props;
  console.log(items);
  return (
    <StorageCard>
      <StorageTitle onClick={onClick}>{name}</StorageTitle>
    </StorageCard>
  );
};

export default Storage;
