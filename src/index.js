import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import allreducers from './Reducer/allReducer';
import { loadState, saveState } from './config/storage';

const persistedState = loadState()


const store = createStore(allreducers, persistedState)
store.subscribe(() => {
  saveState({
    token: store.getState().token,
    user: store.getState().user,
    site: store.getState().site,

  })
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
