import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import styled from 'styled-components';
import { useStore } from './store/store';
import Orders from './pages/orders';
import Checkout from './pages/checkout'
import saleCartReducer from './reducers/saleCart';
import modalHandlerReducer from './reducers/modalHandler';
import Navbar from './containers/Navbar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ProductList from './pages/ProductList';

const App = styled.div`
  height: 100%;
  background-color: #fafafa;
`;

let store = createStore(combineReducers({saleCart: saleCartReducer, modalHandler: modalHandlerReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const Container = () => {
  const state = useStore()[0];

  let routes = (
    <>
    <Route exact path='/'>
      <ProductList />
    </Route>
    <Redirect to="/"/>
    </>
  )
  if(state.isAuth){
    routes = (
      <>
      <Route exact path='/'>
        <ProductList />
      </Route>
      <Route path='/orders'>
        <Orders />
      </Route>
      <Route path='/checkout'>
        <Checkout />
      </Route>
      </>
    )
  }

  return (
    <Provider store={store}>
      <Router>
      <Navbar />
        <App className='App'>
          <Switch>
            { routes }
          </Switch>
        </App>
      </Router>
    </Provider>
  );
};

export default Container;
