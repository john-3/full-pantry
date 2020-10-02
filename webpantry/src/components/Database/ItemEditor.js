import axios from 'axios';
import React, { useState, } from 'react';
import styled from 'styled-components';
import AddItem from './AddItem';

const ItemContainer = styled.div`
`;

const ItemEditor = (props) => {

    const { refresh, onClick } = props

    const [items, setItems] = useState(props.items)
    const [isDone, setIsDone] = useState(false)

    const handleInputChange = (event, index) => {
        setItems([
            ...items.slice(0, index),
            {
                ...items[index],
                [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
            },
            ...items.slice(index + 1)
        ])
        console.log(items, 'items');
    };

    const handleSelectChange = (event, index) => {
        setItems([
            ...items.slice(0, index),
            {
                ...items[index],
                storage: parseInt(event.target.value)
            },
            ...items.slice(index + 1)
        ])
        console.log(items, 'items');
    };

    const updateItems = async () => {
        await items.map(item => (
            axios.put(`http://127.0.0.1:8000/api/items/${item.id}/`, item, {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('jwt')
                }
            })
                .then(res => { console.log(res) })

                .catch(e => { console.log(e) })
        ))

    }


    return (
        <div>
            {isDone
                ?
                (updateItems(), onClick())
                :
                <div>
                    <div style={{ 'padding-left': '200px' }}>
                        <button onClick={() => setIsDone(true)} className="btn btn-success" >Complete changes</button>
                    </div>

                    {items.map((item, index) => (
                        <ItemContainer key={item.id} style={{ 'padding-left': '200px', 'height': '25px' }}>

                            <input type="text" className="form-inline" required value={item.name} onChange={(event) => handleInputChange(event, index)} name="name" />

                            <input type="number" className="form-inline" required value={item.quantity} onChange={(event) => handleInputChange(event, index)} name="quantity" />

                            <input type="date" className="form-inline" value={item.expiry} onChange={(event) => handleInputChange(event, index)} name="expiry" />

                            <select value={item.storage} defaultValue={'0'} onChange={(event) => handleSelectChange(event, index)}>
                                <option value='0' disabled> -- Select </option>
                                <option value='1'>Refrigerator</option>
                                <option value='2'>Freezer</option>
                                <option value='3'>Pantry</option>
                            </select>
                            <label>{item.id}</label>
                        </ItemContainer>
                    ))}
                    <AddItem update={updateItems} refresh={(props) => refresh(props)} />
                </div>
            }
        </div >
    );


}

export default ItemEditor;