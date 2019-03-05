import { takeEvery, put, select } from 'redux-saga/effects';
import { insertTask, deleteTask, addToUnDo } from '../actions/actions';
import { getEntity } from '../selectors/selectorsForEntities';

export function* deleteTaskWatcher() {
    yield takeEvery('START_DELETE_TASK_PROCESS', deleteTaskGen);
}

function* deleteTaskGen(action) {
    let task = yield select(getEntity(action.payload.path, action.payload.pathParam));
    yield put(deleteTask({ path: action.payload.path, pathParam: action.payload.pathParam }));
    yield put(addToUnDo({
        undoOperation: insertTask,
        redoOperation: deleteTask,
        obj: task
    }));
}