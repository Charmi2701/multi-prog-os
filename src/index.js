import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './reducers/rootReducer.js'
import thunk from 'redux-thunk';

/*
const initState = {
  count: 42
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "Trial":
      return {count: state.count * 10};
    default:
      return state;
  }
}
*/
const store = createStore(rootReducer,
  compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById('root')
);
