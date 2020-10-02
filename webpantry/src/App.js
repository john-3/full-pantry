import React from 'react';
import UpdatedStorage from './actions/UpdatedStorage';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import Navigation from './components/Reusable/Navigation';
import Inventory from './components/Reusable/Inventory';
import AddItem from './components/Database/AddItem';

const Test = () => {

  return (
    <div>
      <AddItem />
    </div>
  )
}

const App = () => {

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path='/test'>
          <Test />
        </Route>
        <Route path='/add'>
          <AddItem />
        </Route>
        <Route path='/inventory'>
          <Inventory />
        </Route>
        <Route path='/'>
          <UpdatedStorage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
