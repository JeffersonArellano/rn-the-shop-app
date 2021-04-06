import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import Navigator from './navigation/Navigator';

const rootReducer = combineReducers({ products: productsReducer });

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
