import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const ItemCard = styled.div`
    padding-left: 200px;
    `;

const AddEntry = styled.div`
`;


const AddItem = (props) => {
    const { update, refresh } = props

    const [item, setItem] = useState([])
    const [submitted, setSubmitted] = useState(true)
    const [items, setItems] = useState([])


    const handleInputChange = event => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
        console.log(item)
    };

    const handleSelectChange = (event) => {
        setItem({ ...item, storage: event.target.value })
        console.log(event.target.name)
    }

    const handleInputEdit = (event, index) => {
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

    const handleSelectEdit = (event, index) => {
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

    const saveItem = async (item) => {
        console.log(item)//
        await axios.post('http://127.0.0.1:8000/api/items/', item)
            .then(res => {
                console.log(res.data.id, 'res')
                refresh(res.data.id);//updates selected list with current item
                update();//saves the editted items
                setItems([...items, item])
                setSubmitted(true);//makes it just the button +item
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newItem = () => {
        setItem([]);
        setSubmitted(false);

    }

    const addEntry = (item) => {
        return (
            <AddEntry>
                <input type="text" className="form-inline" required value={item.name} onChange={handleInputChange} name="name" />

                <input type="number" className="form-inline" required value={item.quantity} onChange={handleInputChange} name="quantity" />

                <input type="date" className="form-inline" value={item.expiry} onChange={handleInputChange} name="expiry" />

                <select value={item.storage} defaultValue={'0'} onChange={handleSelectChange}>
                    <option value='0' disabled> -- Select </option>
                    <option value='1'>Refrigerator</option>
                    <option value='2'>Freezer</option>
                    <option value='3'>Pantry</option>
                </select>

                <button onClick={() => (
                    saveItem(item)

                )} className="btn btn-success">
                    +Add
                            </button>
            </AddEntry >)
    }

    //const itemEntry = () => Object.entries(item).map(([key, value]) => (<div>{key} | {value}</div>))

    const moreItems = () => {
        return (
            <div>
                {items.map((item, index) => (
                    <div key={item.id}>
                        <input type="text" className="form-inline" required value={item.name} onChange={(event) => handleInputEdit(event, index)} name="name" />

                        <input type="number" className="form-inline" required value={item.quantity} onChange={(event) => handleInputEdit(event, index)} name="quantity" />

                        <input type="date" className="form-inline" value={item.expiry} onChange={(event) => handleInputEdit(event, index)} name="expiry" />

                        <select value={item.storage} defaultValue={'0'} onChange={(event) => handleSelectEdit(event, index)}>
                            <option value='0' disabled> -- Select </option>
                            <option value='1'>Refrigerator</option>
                            <option value='2'>Freezer</option>
                            <option value='3'>Pantry</option>
                        </select>
                        <label>{item.id}</label>
                    </div>
                ))}
            </div>)
    }



    return (

        <ItemCard>
            {submitted ? (
                <div>
                    <div>
                        {moreItems()}
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={() => newItem()}>
                            +item
                    </button>
                    </div>

                </div>
            ) : (
                    <div>
                        <div>
                            {items && moreItems()}{addEntry(item)}
                        </div>
                    </div>
                )
            }
        </ItemCard >
    );
}

export default AddItem;