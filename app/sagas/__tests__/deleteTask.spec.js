import { takeEvery, put, select } from 'redux-saga/effects';
import { Map } from 'immutable';
import { insertTask, deleteTask, addToUnDo } from '../../actions/actions';
import { getEntity } from '../../selectors/selectorsForEntities';
import deleteTaskWatcher, { deleteTaskGen } from '../deleteTask';
import { initialState } from '../../reducers/states/initialState';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_DELETE_TASK_PROCESS',
    payload: {
      path: ['categories', 0, 'tasks'],
      pathParam: 1,
    },
  };

  describe('deleteTaskGen', () => {
    const task = Map().merge(initialState).getIn(['categories', 0, 'tasks', 1]).toObject();
    task.path = ['categories', 0, 'tasks'];
    task.pathParam = 1;
    const addUndoObj = {
      undoOperation: insertTask,
      redoOperation: deleteTask,
      obj: task,
    };
    const gen = deleteTaskGen(action);

    const res = getEntity(action.payload.path, action.payload.pathParam);
    it('should take selector', () => {
      expect(gen.next().value.SELECT.selector.toString())
        .toEqual(select(res).SELECT.selector.toString());
    });

    it('should dispatch action to delete task', () => {
      expect(gen.next(res({ actionReducers: Map().merge(initialState) })).value)
        .toEqual(put(deleteTask({
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

  describe('deleteTaskWatcher', () => {
    const gen = deleteTaskWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_DELETE_TASK_PROCESS', deleteTaskGen));
    });
  });
});
