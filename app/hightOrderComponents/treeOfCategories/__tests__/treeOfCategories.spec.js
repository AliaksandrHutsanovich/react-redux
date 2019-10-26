import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import treeOfCategories from '../treeOfCategories';
import { initialState as store } from '../../../reducers/states/initialState';
import CategoryItem from '../../../layout/layoutContent/tasks/categoryItem/categoryItem';

const mockStore = configureStore();
const initialState = Map().merge(store);
const CustomTree = treeOfCategories(CategoryItem);

describe('Unit tests for tree of categories', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  const Component = mount(<CustomTree store={dataStore} />);

  it('full render test', () => {
    expect(Component).toMatchSnapshot();
  });
});
