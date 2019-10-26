import React from 'react';
import { mount } from 'enzyme';
import { Map, List } from 'immutable';
import configureStore from 'redux-mock-store';
import HeaderContent from '../headerContent';

const mockStore = configureStore();
const initialState = {
  unDoReducer: Map({
    undoOperations: List([{}, {}]),
  }),
  reDoReducer: Map({
    redoOperations: List([{}, {}]),
  }),
  countPerсent: Map({ done: 5, all: 10 }),
};

describe('Unit test of HeaderContent', () => {
  it('full render test', () => {
    const store = mockStore(initialState);
    const Component = mount(<HeaderContent store={store} />);
    expect(Component).toMatchSnapshot();
  });

  it('should be clickable', () => {
    const store = mockStore(initialState);
    const Component = mount(<HeaderContent store={store} />);
    Component.find('button').first().simulate('click');
    Component.find('button').at(1).simulate('click');
  });
});
