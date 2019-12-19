import { takeEvery, put, select } from 'redux-saga/effects';
import { Map } from 'immutable';
import deleteCategoryWatcher, { deleteCategoryGen } from '../deleteCategory';
import { deleteCategory, addToUnDo, insertCategory } from '../../actions/actions';
import { getEntity } from '../../selectors/selectorsForEntities';
import { initialState } from '../../reducers/states/initialState';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_ADD_TASK_PROCESS',
    payload: {
      path: ['categories', 0, 'subCategories'],
      pathParam: 1,
    },
  };

  describe('deleteCategoryGen', () => {
    const category = Map().merge(initialState).getIn(['categories', 0, 'subCategories', 1]).toObject();
    category.path = ['categories', 0, 'subCategories'];
    category.pathParam = 1;
    const addUndoObj = {
      undoOperation: insertCategory,
      redoOperation: deleteCategory,
      obj: category,
    };
    const gen = deleteCategoryGen(action);

    const res = getEntity(action.payload.path, action.payload.pathParam);
    it('should take selector', () => {
      expect(gen.next().value.SELECT.selector.toString())
        .toEqual(select(res).SELECT.selector.toString());
    });

    it('should dispatch action to delete category', () => {
      expect(gen.next(res({ actionReducers: Map().merge(initialState) })).value)
        .toEqual(put(deleteCategory({
          path: action.payload.path,
          pathParam: action.payload.pathParam,
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

  describe('deleteCategoryWatcher', () => {
    const gen = deleteCategoryWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_DELETE_CATEGORY_PROCESS', deleteCategoryGen));
    });
  });
});
