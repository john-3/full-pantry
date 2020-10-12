import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const DeleteContainer = styled.div`
  padding: 50px;
`;

const DeleteItem = (props) => {
  const { items, onClick } = props;

  const [deleted, setDeleted] = useState(false);

  const delItems = () => {
    items.map((item) =>
      axios.delete(`http://127.0.0.1:8000/api/items/${item.id}/`)
    );
  };

  const confirmDelete = (items) => {
    if (items && items.length < 2) {
      return `Are you sure you want to delete one item?`;
    } else {
      return `Are you sure you want to delete ${items.length} items?`;
    }
  };

  return (
    <div>
      {deleted ? (
        (delItems(), onClick())
      ) : (
        <DeleteContainer>
          {confirmDelete(items)}
          {items.map((item) => (
            <li>{item.name}</li>
          ))}
          <button onClick={() => setDeleted(true)}>Yes</button>
          <button onClick={() => onClick()}>No</button>
        </DeleteContainer>
      )}
    </div>
  );
};

export default DeleteItem;
