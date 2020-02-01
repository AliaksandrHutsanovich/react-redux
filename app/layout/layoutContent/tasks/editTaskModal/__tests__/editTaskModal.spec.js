import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Modal, Checkbox, Input } from 'antd';
import { initialState as store } from '../../../../../reducers';
import EditTaskModal, { Categories, EditTaskModal as WithoutWrapper } from '../editTaskModal';
import { getOldPathParams } from '../../utils';
import { startEditTaskProcess } from '../../../../../actions';

const { TextArea } = Input;
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

  const Component1 = shallow(
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

  const fragment = Component1;
  it('Category should be clickable', async () => {
    // set a new tast path
    fragment.find(Categories).prop('onSelectCategory')([newTestPath]);
    // change task status
    fragment.find(Checkbox).simulate(
      'change',
      {
        target: {
          checked: true,
        },
      },
    );
    fragment.find(Checkbox).simulate(
      'change',
      {
        target: {
          checked: newTasksStatus,
        },
      },
    );
    // change task title
    fragment.find(Input).simulate(
      'change',
      {
        target: {
          value: newTaskTitle,
        },
      },
    );
    // change task description
    fragment.find(TextArea).simulate(
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
    fragment.find(Modal).prop('onOk')();

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
});
