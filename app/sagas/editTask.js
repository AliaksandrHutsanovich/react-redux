import { takeEvery, put, select } from 'redux-saga/effects';
import { editTask, addToUnDo, editTaskRevive } from '../actions/actions';
import { getEntityByPath } from '../selectors/selectorsForEntities';

function* editTaskGen(action) {
  const task = yield select(
    getEntityByPath(
      action.payload.oldPath,
      action.payload.newPath,
      action.payload.title,
      action.payload.description,
      action.payload.isFinished,
      action.payload.oldPathParam,
      action.payload.newPathParam,
    ),
  );
  yield put(editTask({
    newPath: action.payload.newPath,
    oldPath: action.payload.oldPath,
    oldPathParam: action.payload.oldPathParam,
    newPathParam: action.payload.newPathParam,
    title: action.payload.title,
    description: action.payload.description,
    isFinished: action.payload.isFinished,
  }));
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
