import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Map } from 'immutable';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState as store } from '../../../../reducers/states/initialState';
import Category from '../category';

const mockStore = configureStore();
const initialState = Map().merge(store);

describe('Unit test of Category component', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  const Component = mount(
    <Provider store={dataStore}>
      <BrowserRouter>
        <Category
          path="category-0"
          title="My category"
        />
      </BrowserRouter>
    </Provider>,
  );

  it('Full render test', () => {
    expect(Component).toMatchSnapshot();
  });
  it('Delete modal should be openable', () => {
    Component.find('i[aria-label="icon: delete"]').simulate('click');
    Component.find('.ant-modal-footer').find('button').at(0).simulate('click');
    Component.find('i[aria-label="icon: delete"]').simulate('click');
    Component.find('.ant-modal-footer').find('button').at(1).simulate('click');
  });
  it('Edit modal should be openable and closable', () => {
    Component.find('i[aria-label="icon: edit"]').simulate('click');
    Component.find('.ant-modal-footer').find('button').at(0).simulate('click');
    Component.find('i[aria-label="icon: edit"]').simulate('click');
    Component.find('.ant-modal-footer').find('button').at(1).simulate('click');
  });
  it('Add modal should be openable and closable', () => {
    Component.find('i[aria-label="icon: plus"]').simulate('click');
    Component.find('.ant-modal-footer').find('button').at(0).simulate('click');
    Component.find('i[aria-label="icon: plus"]').simulate('click');
    Component.find('.ant-modal-footer').find('button').at(1).simulate('click');
  });
});
