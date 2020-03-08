import { takeEvery, put, select } from 'redux-saga/effects';
import { Map } from 'immutable';
import addTaskWatcher, { addTaskGen } from '../addTask';
import {
  addTask,
  deleteTask,
  addToUnDo,
  clearReDo,
} from '../../actions/actions';
import { initialState } from '../../reducers/states/initialState';
import { getTaskPath } from '../../selectors/selectorsForPaths';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_ADD_TASK_PROCESS',
    payload: {
      title: 'my new task',
      path: ['categories', 0, 'tasks'],
    },
  };
  describe('addTaskGen', () => {
    const addUndoObj = {
      undoOperation: deleteTask,
      redoOperation: addTask,
      obj: {
        path: action.payload.path,
        pathParam: 1,
        title: action.payload.title,
        description: '',
        isFinished: false,
      },
    };
    const gen = addTaskGen(action);

    it('should dispatch action to clear redo', () => {
      expect(gen.next().value)
        .toEqual(put(clearReDo()));
    });

    it('should dispatch action to add new task', () => {
      expect(gen.next().value)
        .toEqual(put(addTask({ path: action.payload.path, title: action.payload.title })));
    });

    const res = getTaskPath(['categories', 0, 'tasks']);
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

  describe('addTaskWatcher', () => {
    const gen = addTaskWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_ADD_TASK_PROCESS', addTaskGen));
      expect(gen.next().done).toBeTruthy();
    });
  });
});
