import { takeEvery, put } from 'redux-saga/effects';
import { editTaskStatus, addToUnDo } from '../actions';

export function* editTaskStatusGen(action) {
  yield put(editTaskStatus({
    path: action.payload.path,
    pathParam: action.payload.pathParam,
    value: action.payload.value,
  }));
  yield put(addToUnDo({
    undoOperation: editTaskStatus,
    redoOperation: editTaskStatus,
    obj: {
      path: action.payload.path,
      pathParam: action.payload.pathParam,
      value: action.payload.value,
    },
  }));
}

function* editTaskStatusWatcher() {
  yield takeEvery('START_EDIT_TASK_STATUS_PROCESS', editTaskStatusGen);
}

export default editTaskStatusWatcher;
