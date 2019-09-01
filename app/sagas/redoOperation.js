import { takeEvery, put, select } from 'redux-saga/effects';
import { deleteFromReDo, addToUnDo } from '../actions/actions';
import { getRedoOperation, getObjFromRedoOperation, getObjWrapperFromRedoOperation } from '../selectors/selectorsForOperation';

function* redoOperationGen() {
  const operation = yield select(getRedoOperation);
  const obj = yield select(getObjFromRedoOperation);
  yield put(operation(obj));
  const objWrapper = yield select(getObjWrapperFromRedoOperation);
  yield put(addToUnDo(objWrapper));
  yield put(deleteFromReDo());
}

function* redoOperationWatcher() {
  yield takeEvery('START_REDO_PROCESS', redoOperationGen);
}

export default redoOperationWatcher;
