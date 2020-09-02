import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import './App.css';

import StorageContainer from './components/Reusable/StorageContainer';

const reqOne = axios.get('http://127.0.0.1:8000/api/items');
const reqTwo = axios.get('http://127.0.0.1:8000/api/storage');

const HeaderTitle = styled.h1``;

const App = () => {
  const [storage, setStorage] = useState();

  useEffect(() => {
    axios
      .all([reqOne, reqTwo])
      .then(
        axios.spread((...res) => {
          const items = res[0].data;
          const storages = res[1].data;
          const sortedStorages = storages.map((storage) => {
            return {
              name: storage.name,
              items: items.filter((item) => item.storage === storage.id),
              id: storage.id,
            };
          });
          setStorage(sortedStorages);
        })
      )
      .catch((err) => {
        // TODO: Error handling
        console.log(err);
      });
  }, []);

  return (
    <div>
      <HeaderTitle>Pantry</HeaderTitle>
      <StorageContainer storage={storage} />
    </div>
  );
};

export default App;
