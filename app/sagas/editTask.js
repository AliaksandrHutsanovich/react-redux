import { takeEvery, put, select } from 'redux-saga/effects';
import {
  editTask,
  addToUnDo,
  editTaskRevive,
  switchContentDisplay,
  clearReDo,
} from '../actions';
import { getEntityByPath } from '../selectors';

export function* editTaskGen({
  payload: {
    oldPath,
    newPath,
    title,
    description,
    isFinished,
    location,
    oldPathParam,
    newPathParam,
  },
}) {
  yield put(clearReDo());
  const task = yield select(
    getEntityByPath(
      oldPath,
      newPath,
      title,
      description,
      isFinished,
      location,
      oldPathParam,
      newPathParam,
    ),
  );
  yield put(editTask({
    newPath,
    oldPath,
    oldPathParam,
    newPathParam,
    title,
    description,
    isFinished,
    location,
  }));
  yield put(switchContentDisplay({ isDisplayed: true }));
  yield put(addToUnDo({
    undoOperation: editTask,
    redoOperation: editTaskRevive,
    obj: task,
  }));
}

function* editTaskWatcher() {
  yield takeEvery('START_EDIT_TASK_PROCESS', editTaskGen);
}

export default editTaskWatcher;
