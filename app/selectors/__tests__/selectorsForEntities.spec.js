import { Map } from 'immutable';
import { getEntityByPath } from '../selectorsForEntities';
import { initialState } from '../../reducers';

const argsConfig = {
  oldPath: ['categories', 0, 'tasks'],
  oldPathParam: 1,
  title: 'new title of this task',
  description: 'new description of this task',
  isFinished: true,
  location: Map({}),
};

const state = {
  actionReducers: Map().merge(initialState),
};

describe('getEntityByPath', () => {
  it('function should return proper entity', () => {
    expect(
      getEntityByPath(
        argsConfig.oldPath,
        argsConfig.newPath,
        argsConfig.title,
        argsConfig.description,
        argsConfig.isFinished,
        argsConfig.location,
        argsConfig.oldPathParam,
        argsConfig.newPathParam,
      )(state),
    ).toEqual({
      newPath: undefined,
      newPathParam: undefined,
      oldPath: argsConfig.oldPath,
      oldPathParam: argsConfig.oldPathParam,
      titlePrimary: argsConfig.title,
      descriptionPrimary: argsConfig.description,
      isFinishedValuePrimary: argsConfig.isFinished,
      description: 'count',
      isFinished: true,
      title: 'counting',
      location: Map({}),
      locationPrimary: Map({}),
    });
  });
});
