import React, { useState, useEffect } from 'react';
import StorageContainer from '../components/Reusable/StorageContainer';
import axios from 'axios';

// const reqOne = axios.get('http://fpantry.herokuapp.com/api/items');
// const reqTwo = axios.get('http://fpantry.herokuapp.com/api/storage');

const reqOne = axios.get('http://127.0.0.1:8000/api/items');
const reqTwo = axios.get('http://127.0.0.1:8000/api/storages');

const UpdatedStorage = () => {

    const [storage, setStorage] = useState([]);

    useEffect(() => {
        axios
            .all([reqOne, reqTwo])
            .then(
                axios.spread((...res) => {
                    console.log(res)
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

    return <StorageContainer storage={storage} />
}

export default UpdatedStorage;