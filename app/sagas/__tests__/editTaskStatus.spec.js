import { takeEvery, put } from 'redux-saga/effects';
import { editTaskStatus, addToUnDo } from '../../actions/actions';
import editTaskStatusWatcher, { editTaskStatusGen } from '../editTaskStatus';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_EDIT_TASK_STATUS_PROCESS',
    payload: {
      path: ['categories', 0, 'tasks'],
      pathParam: 1,
      value: false,
    },
  };

  describe('editTaskStatusGen', () => {
    const addUnDoObj = {
      undoOperation: editTaskStatus,
      redoOperation: editTaskStatus,
      obj: {
        path: action.payload.path,
        pathParam: action.payload.pathParam,
        value: action.payload.value,
      },
    };

    const gen = editTaskStatusGen(action);
    it('should dispatch action to edit task status', () => {
      expect(gen.next().value)
        .toEqual(put(editTaskStatus({
          path: action.payload.path,
          pathParam: action.payload.pathParam,
          value: action.payload.value,
        })));
    });

    it('should dispatch action to add object to addUndo selector', () => {
      expect(gen.next().value)
        .toEqual(put(addToUnDo(addUnDoObj)));
    });

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('editTaskStatusWatcher', () => {
    const gen = editTaskStatusWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_EDIT_TASK_STATUS_PROCESS', editTaskStatusGen));
    });
  });
});
