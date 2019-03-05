import { takeEvery, put, select } from 'redux-saga/effects';
import { addCategory, deleteCategory, addToUnDo } from '../actions/actions';
import { getCategoryPath } from '../selectors/selectorsForPaths';

export function* addCategoryWatcher() {
    yield takeEvery('START_ADD_CATEGORY_PROCESS', addCategoryGen);
}

function* addCategoryGen(action) {
    yield put(addCategory({ title: action.payload.title }));
    let path = yield select(getCategoryPath);
    yield put(addToUnDo({ 
        undoOperation: deleteCategory, 
        redoOperation: addCategory, 
        obj: { path: [path.split('-')[0]], pathParam: path.split('-')[1], title: action.payload.title, subCategories: [], tasks: [] } 
    }));
}