import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { initialState as store } from '../../../../../reducers/states/initialState';
import EditTaskModal from '../editTaskModal';

const mockStore = configureStore();
const initialState = Map().merge(store);

describe('Unit test of edit task modal', () => {
  const dataStore = mockStore({ actionReducers: initialState });

  const Component = mount(
    <Provider store={dataStore}>
      <EditTaskModal
        taskTitle="Buy a new stearing wheal"
        description="This task is very important"
        isFinished
        oldPath="/task"
        handleOk={() => {}}
        visible
        handleCancel={() => {}}
      />
    </Provider>,
  );

  it('Full render test of edit task modal', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Category should be clickable', () => {
    Component.find('.ant-tree-node-content-wrapper').at(0).simulate('click');
  });

  it('Button save changes should be clickable', () => {
    Component.find('.ant-btn-primary').simulate('click');
  });

  it('Status should be changable', () => {
    Component.find('input[type="checkbox"]').simulate(
      'change',
      {
        target: {
          checked: false,
        },
      },
    );
    expect(Component.find('input[type="checkbox"]').props().checked).toEqual(false);
    Component.find('input[type="checkbox"]').simulate(
      'change',
      {
        target: {
          checked: true,
        },
      },
    );
    expect(Component.find('input[type="checkbox"]').props().checked).toEqual(true);
  });

  it('Task description should be changable', () => {
    Component.find('textarea').simulate(
      'change',
      {
        target: {
          value: 'New description',
        },
      },
    );
  });

  it('Task title should be changable', () => {
    Component.find('input[type="text"]').simulate(
      'change',
      {
        target: {
          value: 'New task title',
        },
      },
    );
    expect(Component.find('input[type="text"]').props().value).toEqual('New task title');
  });
});
