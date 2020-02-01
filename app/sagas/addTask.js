import { takeEvery, put, select } from 'redux-saga/effects';
import { addTask, deleteTask, addToUnDo } from '../actions';
import { getTaskPath } from '../selectors';

export function* addTaskGen({ payload: { path, title } }) {
  yield put(addTask({ path, title }));
  const pathParam = yield select(getTaskPath(path));
  yield put(addToUnDo({
    undoOperation: deleteTask,
    redoOperation: addTask,
    obj: {
      path,
      pathParam,
      title,
      description: '',
      isFinished: false,
    },
  }));
}

function* addTaskWatcher() {
  yield takeEvery('START_ADD_TASK_PROCESS', addTaskGen);
}

export default addTaskWatcher;
