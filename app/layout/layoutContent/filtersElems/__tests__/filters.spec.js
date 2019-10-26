import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Filters from '../filters';

const mockStore = configureStore();
const initialState = {};

describe('Unit test of filters', () => {
  const store = mockStore(initialState);
  const Component = mount(<Filters store={store} searchKey="" showDone />);
  it('full render test', () => {
    expect(Component).toMatchSnapshot();
  });

  it('checkbox should be clickable', () => {
    Component.find('input[type="checkbox"]').simulate('click');
  });

  it('input text should be changable', () => {
    Component.find('input[type="text"]').simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    expect(Component.find('input[type="text"]').props().value).toEqual('javascript');
  });
});
