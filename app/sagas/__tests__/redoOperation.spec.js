import { takeEvery, put, select } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import redoOperationWatcher, { redoOperationGen } from '../redoOperation';
import { deleteFromReDo, addToUnDo, addCategory } from '../../actions/actions';
import {
  getRedoOperation,
  getObjFromRedoOperation,
  getObjWrapperFromRedoOperation,
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
    redoOperation: addCategory,
    obj,
  });
  const initialState = {
    redoOperations: List([objWrapper]),
  };

  describe('redoOperationGen', () => {
    const gen = redoOperationGen();
    it('should take a selector getRedoOperation', () => {
      expect(gen.next().value)
        .toEqual(select(getRedoOperation));
    });

    it('should take next selector getObjFromRedoOperation', () => {
      expect(gen.next(getRedoOperation({
        reDoReducer: Map(initialState),
      })).value)
        .toEqual(select(getObjFromRedoOperation));
    });

    it('should put action after selector has been taken', () => {
      expect(gen.next(getObjFromRedoOperation({
        reDoReducer: Map(initialState),
      })).value)
        .toEqual(put(addCategory(obj)));
    });

    it('should take selector', () => {
      expect(gen.next().value)
        .toEqual(select(getObjWrapperFromRedoOperation));
    });

    it('should put action after selector has been taken', () => {
      expect(gen.next(getObjWrapperFromRedoOperation({
        reDoReducer: Map(initialState),
      })).value)
        .toEqual(put(addToUnDo(objWrapper)));
    });

    it('should put action', () => {
      expect(gen.next().value).toEqual(put(deleteFromReDo()));
    });

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('redoOperationWatcher', () => {
    const gen = redoOperationWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_REDO_PROCESS', redoOperationGen));
    });
  });
});
