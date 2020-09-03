import React from 'react';
import Storage from './Storage';

const StorageContainer = (props) => {
  const { storage } = props;

  const loadStorageHandler = (event) => {
    // const storageNumber = event.target.id;
    // const filteredItems = this.state.items.filter(
    //   (item) => item.storage === Number(storageNumber)
    // );
    // this.setState((empty) => {
    //   return { empty: filteredItems };
    // });
    console.log('click');
  };

  const storageItems =
    storage &&
    storage.map((item) => (
      <Storage
        onClick={loadStorageHandler}
        id={item.id}
        key={item.id}
        items={item.items}
        name={item.name}
      />
    ));
  return storageItems || <React.Fragment />;
};

export default StorageContainer;
