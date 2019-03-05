import { takeEvery, put, select } from 'redux-saga/effects';
import { addSubCategory, deleteCategory, addToUnDo } from '../actions/actions';
import { getSubCategoryPath } from '../selectors/selectorsForPaths';

export function* addSubCategoryWatcher() {
    yield takeEvery('START_ADD_SUB_CATEGORY_PROCESS', addSubCategoryGen);
}

function* addSubCategoryGen(action) {
    yield put(addSubCategory({ path: action.payload.path, title: action.payload.title }));
    let pathParam = yield select(getSubCategoryPath(action.payload.path));
    yield put(addToUnDo({ 
        undoOperation: deleteCategory, 
        redoOperation: addSubCategory, 
        obj: { path: action.payload.path, pathParam: pathParam, title: action.payload.title, subCategories: [], tasks: [] } 
    }));
}