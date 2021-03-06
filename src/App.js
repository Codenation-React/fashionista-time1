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
import ProductModal from './pages/ProductModal';

const App = styled.div`
  height: auto;
  background-color: #fafafa;
`;

let store = createStore(combineReducers({saleCart: saleCartReducer, modalHandler: modalHandlerReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const Container = () => {
  const state = useStore()[0];

  let routes = (
    <Switch>
      <Route exact path="/product/:id" component={ProductModal} />
      <Route exact path='/' component={ProductList} />
      <Redirect to="/"/>
    </Switch>
  )
  if(state.isAuth){
    routes = (
      <Switch>
        <Route path="/product/:id" component={ProductModal} />
        <Route exact path='/' component={ProductList} />
        <Route path='/orders' component={Orders}/>
        <Route path='/checkout'component={Checkout} />
        <Redirect to="/"/>
      </Switch>
    )
  }

  return (
    <Provider store={store}>
      <Router>
      <Navbar />
        <App className='App'>
            { routes }
        </App>
      </Router>
    </Provider>
  );
};

export default Container;
