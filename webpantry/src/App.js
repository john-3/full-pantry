import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

const reqOne = axios.get('http://127.0.0.1:8000/api/items');
const reqTwo = axios.get('http://127.0.0.1:8000/api/storage');


class App extends Component {
  state = {
    empty: [],
    items: [],
    storage: []
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios
      .all([reqOne, reqTwo])
      .then(axios.spread((...res) => {
        console.log(res[0].data, "data1: ");
        console.log(res[1].data, "data2: ");

        this.setState({ items: res[0].data, storage: res[1].data });


      }))

      .catch(err => {
        console.log(err);
      });
  }

  stupidHandler(event) {
    console.log(event.target.id);
    const storageIndex = event.target.id;
    const x = this.state.storage.filter((cat) => cat.id === Number(storageIndex));
    console.log(x)
  }

  loadHandler(event) {
    const storageNumber = event.target.id
    const filteredItems = this.state.items.filter((item) => item.storage === Number(storageNumber))
    this.setState((empty) => {
      return { empty: filteredItems }
    });
  }

  render() {
    return (
      <div>
        <h1>Pantry</h1>

        <div>
          {this.state.storage.map(storages => (
            <p class="card-storage" id={storages.id} onClick={(event) => this.loadHandler(event)}>{storages.name}</p>
          ))}
        </div>
        <div>
          <p><br /></p>
        </div>
        <div>
          {this.state.empty.map(item => (
            <div class="card-item">
              <p>ID: {item.id}</p>
              <p>ITEM: <span id={item.storage} onClick={(event) => this.stupidHandler(event)}>{item.name}</span></p>
              <p>STORAGE ID: {item.storage}</p>
              <p>this item belongs in the {String(item.storage && this.state.storage.filter((cat) => cat.id === Number(item.storage))[0].name).toLowerCase()}.</p>
              <br />
            </div>
          ))}
        </div>


      </div>
    );
  }
}
export default App;
