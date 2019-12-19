import { takeEvery, put, select } from 'redux-saga/effects';
import { deleteFromUnDo, addToReDo } from '../actions/actions';
import { getUndoOperation, getObjFromUndoOperation, getObjWrapperFromUndoOperation } from '../selectors/selectorsForOperation';

export function* undoOperationGen() {
  const operation = yield select(getUndoOperation);
  const obj = yield select(getObjFromUndoOperation);
  yield put(operation(obj));
  const objWrapper = yield select(getObjWrapperFromUndoOperation);
  yield put(addToReDo(objWrapper));
  yield put(deleteFromUnDo());
}

function* undoOperationWatcher() {
  yield takeEvery('START_UNDO_PROCESS', undoOperationGen);
}

export default undoOperationWatcher;
