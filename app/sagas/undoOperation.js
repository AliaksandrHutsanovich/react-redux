import { takeEvery, put, select } from 'redux-saga/effects';
import { deleteFromUnDo, addToReDo } from '../actions/actions';
import { getUndoOperation, getObjFromUndoOperation, getObjWrapperFromUndoOperation } from '../selectors/selectorsForOperation';

export function* undoOperationWatcher() {
    yield takeEvery('START_UNDO_PROCESS', undoOperationGen);
}

function* undoOperationGen() {
    let operation = yield select(getUndoOperation);
    let obj = yield select(getObjFromUndoOperation);
    yield put(operation(obj));
    let objWrapper = yield select(getObjWrapperFromUndoOperation);
    yield put(addToReDo(objWrapper));
    yield put(deleteFromUnDo());
}