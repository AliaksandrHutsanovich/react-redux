import { takeEvery, put, select } from 'redux-saga/effects';
import { Map } from 'immutable';
import {
  editTask,
  addToUnDo,
  editTaskRevive,
  switchContentDisplay,
  clearReDo,
} from '../../actions/actions';
import { getEntityByPath } from '../../selectors/selectorsForEntities';
import editTaskWatcher, { editTaskGen } from '../editTask';
import { initialState } from '../../reducers/states/initialState';

describe('every saga should work step by step', () => {
  const action = {
    type: 'START_EDIT_TASK_PROCESS',
    payload: {
      oldPath: ['categories', 0, 'tasks'],
      oldPathParam: 1,
      newPath: ['categories', 1, 'tasks'],
      newPathParam: '',
      title: 'new title of this task',
      description: 'new description of this task',
      isFinished: false,
      location: Map({}),
    },
  };

  describe('editTaskGen', () => {
    const task = Map().merge(initialState).getIn(['categories', 0, 'tasks', 1]).toObject();
    task.newPath = ['categories', 0, 'tasks'];
    task.newPathParam = 1;
    task.oldPath = ['categories', 1, 'tasks'];
    task.oldPathParam = 2;
    task.titlePrimary = 'new title of this task';
    task.descriptionPrimary = 'new description of this task';
    task.locationPrimary = Map({});
    task.isFinishedValuePrimary = false;

    const addUndoObj = {
      undoOperation: editTask,
      redoOperation: editTaskRevive,
      obj: task,
    };
    const gen = editTaskGen(action);
    const res = getEntityByPath(
      action.payload.oldPath,
      action.payload.newPath,
      action.payload.title,
      action.payload.description,
      action.payload.isFinished,
      action.payload.location,
      action.payload.oldPathParam,
      action.payload.newPathParam,
    );

    it('should dispatch action to clear redo', () => {
      expect(gen.next().value)
        .toEqual(put(clearReDo()));
    });

    it('should take selector', () => {
      expect(gen.next().value.SELECT.selector.toString())
        .toEqual(select(res).SELECT.selector.toString());
    });

    it('should dispatch action to edit task', () => {
      expect(gen.next(res({ actionReducers: Map().merge(initialState) })).value)
        .toEqual(put(editTask({
          newPath: action.payload.newPath,
          oldPath: action.payload.oldPath,
          oldPathParam: action.payload.oldPathParam,
          newPathParam: action.payload.newPathParam,
          title: action.payload.title,
          description: action.payload.description,
          isFinished: action.payload.isFinished,
          location: action.payload.location,
        })));
    });

    it('should dispatch action to switch content display', () => {
      expect(gen.next().value)
        .toEqual(put(switchContentDisplay({ isDisplayed: true })));
    });

    it('should dispatch action to add object to addUndo selector', () => {
      expect(gen.next().value)
        .toEqual(put(addToUnDo(addUndoObj)));
    });

    it('should be done', () => {
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('editTaskWatcher', () => {
    const gen = editTaskWatcher();
    it('should wait before saga hasn`t finished', () => {
      expect(gen.next().value).toEqual(takeEvery('START_EDIT_TASK_PROCESS', editTaskGen));
    });
  });
});
