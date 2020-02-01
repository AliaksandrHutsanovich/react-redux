import { takeEvery, put, select } from 'redux-saga/effects';
import { insertTask, deleteTask, addToUnDo } from '../actions';
import { getEntity } from '../selectors';

export function* deleteTaskGen({ payload: { path, pathParam } }) {
  const task = yield select(getEntity(path, pathParam));
  yield put(deleteTask({ path, pathParam }));
  yield put(addToUnDo({
    undoOperation: insertTask,
    redoOperation: deleteTask,
    obj: task,
  }));
}


function* deleteTaskWatcher() {
  yield takeEvery('START_DELETE_TASK_PROCESS', deleteTaskGen);
}

export default deleteTaskWatcher;
