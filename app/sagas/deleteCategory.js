import { takeEvery, put, select } from 'redux-saga/effects';
import { deleteCategory, addToUnDo, insertCategory } from '../actions';
import { getEntity } from '../selectors';

export function* deleteCategoryGen(action) {
  const category = yield select(getEntity(action.payload.path, action.payload.pathParam));
  yield put(deleteCategory({
    path: action.payload.path,
    pathParam: action.payload.pathParam,
  }));
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
