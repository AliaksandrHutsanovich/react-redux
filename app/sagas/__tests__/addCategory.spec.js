import { put, select, takeEvery } from 'redux-saga/effects';
import { Map } from 'immutable';
import addCategoryWatcher, { addCategoryGen } from '../addCategory';
import { addCategory, addToUnDo, deleteCategory } from '../../actions/actions';
import { getCategoryPath } from '../../selectors/selectorsForPaths';
import { initialState } from '../../reducers/states/initialState';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_ADD_CATEGORY_PROCESS',
    payload: { title: 'new category' },
  };
  describe('addCategoryGen', () => {
    const addUndoObj = {
      undoOperation: deleteCategory,
      redoOperation: addCategory,
      obj: {
        path: ['categories-1'.split('-')[0]],
        pathParam: 'categories-1'.split('-')[1],
        title: action.payload.title,
        subCategories: [],
        tasks: [],
      },
    };
    const gen = addCategoryGen(action);

    it('should dispatch action to add new category', () => {
      expect(gen.next().value)
        .toEqual(put(addCategory({ title: action.payload.title })));
    });

    it('should take selector', () => {
      expect(gen.next().value).toEqual(select(getCategoryPath));
    });

    it('should wait before the selector has not been taken', () => {
      expect(gen.next(getCategoryPath({ actionReducers: Map().merge(initialState) })).value)
        .toEqual(put(addToUnDo(addUndoObj)));
    });

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('addCategoryWatcher', () => {
    const gen = addCategoryWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_ADD_CATEGORY_PROCESS', addCategoryGen));
      expect(gen.next().done).toBeTruthy();
    });
  });
});
