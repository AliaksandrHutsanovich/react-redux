import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import treeOfCategories from '../treeOfCategories';
import { initialState as store } from '../../../reducers';
import CategoryItem from '../../../layout/layoutContent/tasks/categoryItem';

const mockStore = configureStore();
const initialState = Map().merge(store);
const TreeOfCategories = treeOfCategories(CategoryItem);

describe('Unit tests for tree of categories', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  const Component = shallow(<TreeOfCategories store={dataStore} />);

  it('full render test', () => {
    expect(Component).toMatchSnapshot();
    mount(<TreeOfCategories store={dataStore} />);
  });
});
