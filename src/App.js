import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import styled from 'styled-components';

import saleCartReducer from './reducers/saleCart';
import modalHandlerReducer from './reducers/modalHandler';
import Navbar from './containers/Navbar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import ProductList from './pages/ProductList';

const App = styled.div`
  height: 100%;
  background-color: #fafafa;
`;

let store = createStore(combineReducers({saleCart: saleCartReducer, modalHandler: modalHandlerReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const Container = () => {
  return (
    <Provider store={store}>
      <Router>
      <Navbar />
        <App className='App'>
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
