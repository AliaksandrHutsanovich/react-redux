import { takeEvery, put, select } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { deleteFromUnDo, addToReDo, addCategory } from '../../actions/actions';
import undoOperationWatcher, { undoOperationGen } from '../undoOperation';
import {
  getUndoOperation,
  getObjFromUndoOperation,
  getObjWrapperFromUndoOperation,
} from '../../selectors/selectorsForOperation';

describe('every saga should work step by step', () => {
  const obj = {
    path: ['categories-1'.split('-')[0]],
    pathParam: 'categories-1'.split('-')[1],
    title: 'category',
    subCategories: [],
    tasks: [],
  };
  const objWrapper = Map({
    undoOperation: addCategory,
    obj,
  });
  const initialState = {
    undoOperations: List([objWrapper]),
  };

  describe('undoOperationGen', () => {
    const gen = undoOperationGen();
    it('should take a selector getRedoOperation', () => {
      expect(gen.next().value)
        .toEqual(select(getUndoOperation));
    });

    it('should take next selector getObjFromRedoOperation', () => {
      expect(gen.next(getUndoOperation({
        unDoReducer: Map(initialState),
      })).value)
        .toEqual(select(getObjFromUndoOperation));
    });

    it('should put action after selector has been taken', () => {
      expect(gen.next(getObjFromUndoOperation({
        unDoReducer: Map(initialState),
      })).value)
        .toEqual(put(addCategory(obj)));
    });

    it('should take selector', () => {
      expect(gen.next().value)
        .toEqual(select(getObjWrapperFromUndoOperation));
    });

    it('should put action after selector has been taken', () => {
      expect(gen.next(getObjWrapperFromUndoOperation({
        unDoReducer: Map(initialState),
      })).value)
        .toEqual(put(addToReDo(objWrapper)));
      });

    it('should put action', () => {
      expect(gen.next().value).toEqual(put(deleteFromUnDo()));
    });

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('undoOperationWatcher', () => {
    const gen = undoOperationWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_UNDO_PROCESS', undoOperationGen));
    });
  });
});
