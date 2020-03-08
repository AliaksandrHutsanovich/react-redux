import { takeEvery, put, select } from 'redux-saga/effects';
import { getSubCategoryPath } from '../selectors';
import {
  addSubCategory,
  deleteCategory,
  addToUnDo,
  clearReDo,
} from '../actions';

export function* addSubCategoryGen({ payload: { path, title } }) {
  yield put(clearReDo());
  yield put(addSubCategory({ path, title }));
  const pathParam = yield select(getSubCategoryPath(path));
  yield put(addToUnDo({
    undoOperation: deleteCategory,
    redoOperation: addSubCategory,
    obj: {
      path,
      pathParam,
      title,
      subCategories: [],
      tasks: [],
    },
  }));
}

function* addSubCategoryWatcher() {
  yield takeEvery('START_ADD_SUB_CATEGORY_PROCESS', addSubCategoryGen);
}

export default addSubCategoryWatcher;
