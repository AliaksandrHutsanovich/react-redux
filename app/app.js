import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppView from './appView';
import rootReducer from './reducers/reducer';
import addCategoryWatcher from './sagas/addCategory';
import addSubCategoryWatcher from './sagas/addSubCategory';
import addTaskWatcher from './sagas/addTask';
import deleteCategoryWatcher from './sagas/deleteCategory';
import deleteTaskWatcher from './sagas/deleteTask';
import editCategoryWatcher from './sagas/editCategory';
import editTaskWatcher from './sagas/editTask';
import editTaskStatusWatcher from './sagas/editTaskStatus';
import redoOperationWatcher from './sagas/redoOperation';
import undoOperationWatcher from './sagas/undoOperation';

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
