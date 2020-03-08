import { Map } from 'immutable';
import isExist from '../selectorsForValidation';
import { initialState } from '../../reducers';

const state = {
  actionReducers: Map().merge(initialState),
};

describe('isExist', () => {
  const getState = isExist('Mathematic', ['categories']);
  it('function should return true, if title exista in store', () => {
    expect(getState(state)).toBeTruthy();
  });
});
