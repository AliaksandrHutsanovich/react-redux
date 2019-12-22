import { Map } from 'immutable';
import { getUrls } from '../selectors';
import { initialState } from '../../reducers';

const state = {
  actionReducers: Map().merge(initialState),
};

describe('getUrls', () => {
  const res = [
    'categories-0',
    'categories-0-subCategories-0',
    'categories-0-subCategories-1',
    'categories-1',
    'categories-1-subCategories-0',
    'categories-1-subCategories-0-subCategories-0',
  ];
  it('function should return proper value', () => {
    expect(getUrls(state)).toEqual(res);
  });
});
