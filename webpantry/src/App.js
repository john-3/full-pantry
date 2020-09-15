import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import './App.css';

import StorageContainer from './components/Reusable/StorageContainer';

const reqOne = axios.get('http://fpantry.herokuapp.com/api/items');
const reqTwo = axios.get('http://fpantry.herokuapp.com/api/storage');

const HeaderTitle = styled.h1`
  background-color: white;
`;

const App = () => {
  const [storage, setStorage] = useState([]);
  // const currentDate = new Date()

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
    <React.Fragment>
      <HeaderTitle>Pantry</HeaderTitle>
      <StorageContainer storage={storage} />
    </React.Fragment>
  );
};

export default App;
