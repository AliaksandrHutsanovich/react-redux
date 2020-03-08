import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Controller } from 'react-hook-form';
import { Map } from 'immutable';
import { Form, Modal } from 'antd';
import { act } from 'react-dom/test-utils';
import { initialState as store } from '../../../../../reducers';
import EditTaskModal, { Categories, EditTaskModal as WithoutWrapper } from '../editTaskModal';
import { getOldPathParams } from '../../utils';
import { startEditTaskProcess } from '../../../../../actions';

const mockStore = configureStore();
const initialState = Map().merge(store);
const oldPath = '/task';
const taskTitle = 'Buy a new stearing wheal';
const description = 'This task is very important';

const newTestPath = 'categories-0';
const newTasksStatus = false;
const newDescription = 'This task is not done';
const newTaskTitle = 'Change the bought stearing wheal';

jest.mock('../../../../../actions/actions', () => ({
  startEditTaskProcess: jest.fn(),
  clearReDo: () => {},
  decrementInDone: () => {},
}));
jest.mock('../../../../../sagas/execute', () => () => false);

describe('Unit test of edit task modal', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  dataStore.dispatch = jest.fn();

  const Component = shallow(
    <EditTaskModal
      taskTitle={taskTitle}
      description={description}
      isFinished
      oldPath={oldPath}
      handleOk={() => {}}
      visible
      handleCancel={() => {}}
      store={dataStore}
      location={{}}
    />,
  );

  it('Full render test of edit task modal', () => {
    expect(Component.shallow()).toMatchSnapshot();
  });

  it('Category should be clickable', async () => {
    const fragment = shallow(
      <WithoutWrapper
        taskTitle={taskTitle}
        description={description}
        isFinished
        oldPath={oldPath}
        handleOk={() => {}}
        visible
        handleCancel={() => {}}
        store={dataStore}
        dispatch={() => {}}
        location={{}}
      />,
    );
    // set a new tast path
    fragment.find(Categories).prop('onSelectCategory')([newTestPath]);
    const checkbox = fragment.find(Controller).at(1).dive();
    const input = fragment.find(Controller).at(0).dive();
    const textarea = fragment.find(Controller).at(2).dive();
    // change task status
    checkbox.simulate(
      'change',
      {
        target: {
          checked: true,
        },
      },
    );

    checkbox.simulate(
      'change',
      {
        target: {
          checked: newTasksStatus,
        },
      },
    );

    // change task title
    input.simulate(
      'change',
      {
        target: {
          value: newTaskTitle,
        },
      },
    );

    // change task description
    textarea.simulate(
      'change',
      {
        target: {
          value: newDescription,
        },
      },
    );

    const oldPathParams = getOldPathParams(oldPath.split('-'));
    const newPath = (`${newTestPath}-tasks`).split('-');
    const newPathParam = '';
    await fragment.find(Form).prop('onSubmit')();

    expect(startEditTaskProcess).toHaveBeenCalledWith({
      newPath,
      oldPath: oldPathParams.oldPath,
      oldPathParam: oldPathParams.oldPathParam,
      newPathParam,
      title: newTaskTitle,
      description: newDescription,
      isFinished: newTasksStatus,
      location: {},
    });
  });

  it('dialog should be closable', async () => {
    const testFun = jest.fn();
    const fragment = shallow(
      <WithoutWrapper
        taskTitle={taskTitle}
        description={description}
        isFinished
        oldPath={oldPath}
        handleOk={() => {}}
        visible
        handleCancel={testFun}
        store={dataStore}
        dispatch={() => {}}
        location={{}}
      />,
    );

    await act(async () => {
      fragment.find(Modal).prop('onCancel')();
    });
    expect(testFun).toHaveBeenCalled();
  });
});
