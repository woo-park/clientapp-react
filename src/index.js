import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';

import logger from './Middleware/logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { waveData } from './reducers'
import { postsData, commentsData, userNameData, threadsData } from './reducers'

const rootReducer = (state = {}, action) => {
  return {
    // projects: projects(state.projects, action),
    // tasks: tasks(state.tasks, action),
    // page: page(state.page, action),
    // lastAction: lastAction(state.page, action),
    waveData: waveData(state.waveData, action),
    postsData: postsData(state.postsData, action),
    commentsData: commentsData(state.commentsData, action),
    userNameData: userNameData(state.userNameData, action),
    threadsData: threadsData(state.threadsData, action)
  }
};

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
      <App store={store} />
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
