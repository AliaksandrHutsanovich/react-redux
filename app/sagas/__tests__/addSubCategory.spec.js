import { takeEvery, put, select } from 'redux-saga/effects';
import { Map } from 'immutable';
import addSubCategoryWatcher, { addSubCategoryGen } from '../addSubCategory';
import { getSubCategoryPath } from '../../selectors/selectorsForPaths';
import { addSubCategory, deleteCategory, addToUnDo } from '../../actions/actions';
import { initialState } from '../../reducers/states/initialState';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_ADD_SUB_CATEGORY_PROCESS',
    payload: {
      title: 'new subcategory',
      path: ['categories', 0, 'subCategories'],
    },
  };
  describe('addSubCategoryGen', () => {
    const addUndoObj = {
      undoOperation: deleteCategory,
      redoOperation: addSubCategory,
      obj: {
        path: action.payload.path,
        pathParam: 1,
        title: action.payload.title,
        subCategories: [],
        tasks: [],
      },
    };
    const gen = addSubCategoryGen(action);

    it('should dispatch action to add new subcategory', () => {
      expect(gen.next().value)
        .toEqual(put(addSubCategory({ path: action.payload.path, title: action.payload.title })));
    });

    const res = getSubCategoryPath(['categories', 0, 'subCategories']);
    it('should take selector', () => {
      expect(gen.next().value.SELECT.selector.toString())
        .toEqual(select(res).SELECT.selector.toString());
    });

    it('should wait before the selector has not been taken', () => {
      expect(gen.next(res({ actionReducers: Map().merge(initialState) })).value)
        .toEqual(put(addToUnDo(addUndoObj)));
    });

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('addSubCategoryWatcher', () => {
    const gen = addSubCategoryWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_ADD_SUB_CATEGORY_PROCESS', addSubCategoryGen));
      expect(gen.next().done).toBeTruthy();
    });
  });
});
