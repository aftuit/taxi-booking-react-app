import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from "redux-thunk"
import {applyMiddleware, compose, createStore} from "redux"
import { Provider } from 'react-redux';
import {rootReducer} from "./redux/reducers/rootReducer.js"
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.css';
import "./style/main.scss"


const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

ReactDOM.render(

  <Provider store = {store}>
    <App />
  </Provider>,
  
  document.getElementById('root')
 
);

