import { takeEvery, put, select } from 'redux-saga/effects';
import {
  deleteCategory,
  addToUnDo,
  insertCategory,
  clearReDo,
} from '../actions';
import { getEntity } from '../selectors';

export function* deleteCategoryGen({ payload: { path, pathParam } }) {
  yield put(clearReDo());
  const category = yield select(getEntity(path, pathParam));
  yield put(deleteCategory({ path, pathParam }));
  yield put(addToUnDo({
    undoOperation: insertCategory,
    redoOperation: deleteCategory,
    obj: category,
  }));
}

function* deleteCategoryWatcher() {
  yield takeEvery('START_DELETE_CATEGORY_PROCESS', deleteCategoryGen);
}

export default deleteCategoryWatcher;
