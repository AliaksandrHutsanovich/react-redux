import { Map } from 'immutable';
import { getUrls, getTaskByUrl } from '../selectors';
import { initialState } from '../../reducers';

const state = {
  actionReducers: Map().merge(initialState),
};

describe('selectors', () => {
  const res = [
    'categories-0',
    'categories-0-subCategories-0',
    'categories-0-subCategories-1',
    'categories-1',
    'categories-1-subCategories-0',
    'categories-1-subCategories-0-subCategories-0',
  ];
  it('function getUrls should return proper value', () => {
    expect(getUrls(state)).toEqual(res);
  });

  it('function getTaskByUrl should return proper value', () => {
    const task = {
      title: 'integral',
      Description: 'find',
      isFinished: false,
      location: {},
    };
    expect(
      getTaskByUrl('categories-0-subCategories-0-tasks-0')(state.actionReducers),
    )
      .toEqual(Map(task));
  });
});
