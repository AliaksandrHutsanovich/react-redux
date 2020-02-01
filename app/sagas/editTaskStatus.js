import { takeEvery, put } from 'redux-saga/effects';
import { editTaskStatus, addToUnDo } from '../actions';

export function* editTaskStatusGen({ payload: { path, pathParam, value } }) {
  yield put(editTaskStatus({ path, pathParam, value }));
  yield put(addToUnDo({
    undoOperation: editTaskStatus,
    redoOperation: editTaskStatus,
    obj: { path, pathParam, value },
  }));
}

function* editTaskStatusWatcher() {
  yield takeEvery('START_EDIT_TASK_STATUS_PROCESS', editTaskStatusGen);
}

export default editTaskStatusWatcher;
