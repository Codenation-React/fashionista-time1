import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import styled from 'styled-components';

import saleCartReducer from './reducers/saleCart';
import Navbar from './components/Navbar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import ProductList from './pages/ProductList';

const App = styled.div`
  background-color: #fafafa;
`;

let store = createStore(combineReducers({saleCart: saleCartReducer}));
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <App className='App'>
          <Navbar />
          <Switch>
            <Route path='/'>
              <ProductList />
            </Route>
          </Switch>
        </App>
      </Router>
    </Provider>
  );
};

export default Container;
