import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import addForm from '../addForm';

const mockStore = configureStore();
const initialState = {};
const CustomAddForm = addForm('Add new category');


describe('Unit tests of add form component', () => {
  const store = mockStore(initialState);
  const Component = mount(<CustomAddForm store={store} />);
  it('full render test', () => {
    expect(Component).toMatchSnapshot();
  });

  it('input should be changable', () => {
    Component.find('input').simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    expect(Component.find('input').props().value).toEqual('javascript');
  });

  it('button should be clickable', () => {
    Component.find('button').simulate('click');
  });
});
