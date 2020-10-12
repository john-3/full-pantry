import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import styled from 'styled-components';
import axios from 'axios';
import ItemEditor from '../Database/ItemEditor';
import DeleteItem from '../Database/DeleteItem';

const StorageColors = [
  ['', ''],
  ['#63d2d4', '#d47f63'],
  ['#ffde9f', '#bd9fff'],
  ['#ffee60', '#dd60ff'],
]; // refrigerator, freezer, pantry = 1,2,3

const Categories = ['name', 'quantity'];

const Table = styled.table`
  padding: 0px 0px 0px 0px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  border: solid 1px white;
`;

const TableHead = styled.th`
  padding-left: 10px;
  color: black;
  background-color: white;
`;

const TableRow = styled.tr`
  color: ${(props) =>
    props.case && props.case.includes(props.item.id)
      ? StorageColors[props.item.storage][1]
      : '#bcbcbc'};
  background-color: ${(props) =>
    props.case && props.case.includes(props.item.id)
      ? StorageColors[props.item.storage][0]
      : '#808080'};
  &:nth-child(even) {
    color: ${(props) =>
      props.case && props.case.includes(props.item.id)
        ? StorageColors[props.item.storage][1]
        : '#555555'};
    background-color: ${(props) =>
      props.case && props.case.includes(props.item.id)
        ? StorageColors[props.item.storage][0]
        : '#a9a9a9'};
  }
`;

const Inventory = () => {
  const [items, setItems] = useState([]);
  // eslint-disable-next-line
  const [tableHeaders, setTableHeaders] = useState(['Name', 'Quantity']);
  const [selected, setSelected] = useState([]);
  const [editMode, setEditMode] = useState(0);

  useEffect(() => {
    refreshItems();
  }, []);

  useEffect(() => {
    refreshItems();
  }, [editMode]);

  const refreshItems = async () => {
    await axios
      // .get('http://fpantry.herokuapp.com/api/items')
      .get('http://127.0.0.1:8000/api/items')
      .then((res) => {
        setItems(res.data);
        //setTableHeaders(Object.keys(res.data[0]));
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (item, index) => {
    if (selected.includes(item.id)) {
      setSelected((selected) => selected.filter((v) => v !== item.id));
    } else {
      setSelected([...selected, item.id]);
    }
    console.log(selected, 'selected');
  };

  const exitEdit = () => {
    refreshItems();
    setEditMode(0);
    setSelected([]);
  };

  const updateSelected = (props) => {
    setSelected([...selected, props]);
    console.log(selected, 'selected');
    // setEditMode(0)
    // setEditMode(1)
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      {editMode === 1 ? (
        <ItemEditor
          refresh={(props) => updateSelected(props)}
          onClick={exitEdit}
          items={() => items.filter((item) => selected.includes(item.id))}
        />
      ) : editMode === 2 ? (
        <DeleteItem
          onClick={() => exitEdit()}
          items={items.filter((item) => selected.includes(item.id))}
        />
      ) : (
        <div>
          <button onClick={() => setEditMode(1)}>Edit Selected</button>
          <button onClick={() => setEditMode(2)}>Delete selected</button>
          <Table>
            <thead>
              <tr
                style={{
                  paddingLeft: '10px',
                  color: 'black',
                  backgroundColor: 'white',
                }}
              >
                {tableHeaders.map((heading, index) => (
                  <TableHead key={index}>{heading}</TableHead>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <TableRow
                  key={index}
                  case={selected}
                  item={item}
                  onClick={() => handleClick(item, index)}
                >
                  {Object.entries(item)
                    .filter(([k, v]) => Categories.includes(k))
                    .map(([k, v], i) => (
                      <td style={{ padding: '5px 0px 5px 10px' }} key={i}>
                        {v}
                      </td>
                    ))}
                </TableRow>
              ))}
            </tbody>
          </Table>

          <div style={{ padding: '100px 100px 100px 100px' }} />
        </div>
      )}
    </div>
  );
};

export default Inventory;
