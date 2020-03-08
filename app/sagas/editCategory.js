import { takeEvery, put, select } from 'redux-saga/effects';
import {
  editCategory,
  addToUnDo,
  editCategoryRevive,
  clearReDo,
} from '../actions';
import { getEntity } from '../selectors';

export function* editCategoryGen({ payload: { path, pathParam, title } }) {
  yield put(clearReDo());
  const category = yield select(getEntity(path, pathParam, title));
  yield put(editCategory({ path, pathParam, title }));
  yield put(addToUnDo({
    undoOperation: editCategory,
    redoOperation: editCategoryRevive,
    obj: category,
  }));
}

function* editCategoryWatcher() {
  yield takeEvery('START_EDIT_CATEGORY_PROCESS', editCategoryGen);
}

export default editCategoryWatcher;
