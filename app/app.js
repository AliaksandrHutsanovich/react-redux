import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppView from './appView';
import rootReducer from './reducers';
import {
  addCategoryWatcher,
  addSubCategoryWatcher,
  addTaskWatcher,
  deleteCategoryWatcher,
  deleteTaskWatcher,
  editCategoryWatcher,
  editTaskWatcher,
  editTaskStatusWatcher,
  redoOperationWatcher,
  undoOperationWatcher,
} from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

function* rootSaga() {
  yield all([
    addCategoryWatcher(),
    addSubCategoryWatcher(),
    addTaskWatcher(),
    deleteCategoryWatcher(),
    deleteTaskWatcher(),
    editCategoryWatcher(),
    editTaskWatcher(),
    editTaskStatusWatcher(),
    redoOperationWatcher(),
    undoOperationWatcher(),
  ]);
}

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <AppView />
  </Provider>,
  document.getElementById('container'),
);
