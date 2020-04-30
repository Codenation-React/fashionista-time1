import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import saleCartReducer from './reducers/saleCart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import ProductList from './pages/ProductList';

let store = createStore(combineReducers({saleCart: saleCartReducer}));
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
        <Switch>
          <Route path='/'>
            <ProductList />
          </Route>
        </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
