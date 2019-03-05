import { takeEvery, put, select } from 'redux-saga/effects';
import { deleteFromReDo, addToUnDo } from '../actions/actions';
import { getRedoOperation, getObjFromRedoOperation, getObjWrapperFromRedoOperation } from '../selectors/selectorsForOperation';

export function* redoOperationWatcher() {
    yield takeEvery('START_REDO_PROCESS', redoOperationGen);
}

function* redoOperationGen() {
    let operation = yield select(getRedoOperation);
    let obj = yield select(getObjFromRedoOperation);
    yield put(operation(obj));
    let objWrapper = yield select(getObjWrapperFromRedoOperation);
    yield put(addToUnDo(objWrapper));
    yield put(deleteFromReDo());
}

