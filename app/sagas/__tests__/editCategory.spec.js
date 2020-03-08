import { takeEvery, put, select } from 'redux-saga/effects';
import { Map } from 'immutable';
import {
  editCategory,
  addToUnDo,
  editCategoryRevive,
  clearReDo,
} from '../../actions/actions';
import { getEntity } from '../../selectors/selectorsForEntities';
import editCategoryWatcher, { editCategoryGen } from '../editCategory';
import { initialState } from '../../reducers/states/initialState';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_EDIT_CATEGORY_PROCESS',
    payload: {
      path: ['categories', 0, 'subCategories'],
      pathParam: 1,
      title: 'new category title',
    },
  };

  describe('editCategoryGen', () => {
    const category = Map().merge(initialState).getIn(['categories', 0, 'subCategories', 1]).toObject();
    category.path = ['categories', 0, 'subCategories'];
    category.pathParam = 1;
    category.titlePrimary = 'new category title';
    const addUndoObj = {
      undoOperation: editCategory,
      redoOperation: editCategoryRevive,
      obj: category,
    };

    const gen = editCategoryGen(action);
    const res = getEntity(
      action.payload.path,
      action.payload.pathParam,
      action.payload.title,
    );

    it('should dispatch action to clear redo', () => {
      expect(gen.next().value)
        .toEqual(put(clearReDo()));
    });

    it('should take selector', () => {
      expect(gen.next().value.SELECT.selector.toString())
        .toEqual(select(res).SELECT.selector.toString());
    });

    it('should dispatch action to edit category', () => {
      expect(gen.next(res({ actionReducers: Map().merge(initialState) })).value)
        .toEqual(put(editCategory({
          path: action.payload.path,
          pathParam: action.payload.pathParam,
          title: action.payload.title,
        })));
    });

    it('should dispatch action to add object to addUndo selector', () => {
      expect(gen.next().value)
        .toEqual(put(addToUnDo(addUndoObj)));
    });

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('editCategoryWatcher', () => {
    const gen = editCategoryWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_EDIT_CATEGORY_PROCESS', editCategoryGen));
    });
  });
});
