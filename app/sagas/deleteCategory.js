import { takeEvery, put, select } from 'redux-saga/effects';
import { addSubCategory, deleteCategory, addToUnDo, addCategory, insertCategory } from '../actions/actions';
import { getEntity } from '../selectors/selectorsForEntities';

export function* deleteCategoryWatcher() {
    yield takeEvery('START_DELETE_CATEGORY_PROCESS', deleteCategoryGen);
}

function* deleteCategoryGen(action) {
    let category = yield select(getEntity(action.payload.path, action.payload.pathParam));
    yield put(deleteCategory({path: action.payload.path, pathParam: action.payload.pathParam}));
    yield put(addToUnDo({
        undoOperation: insertCategory,
        redoOperation: deleteCategory,
        obj: category
    }));
}