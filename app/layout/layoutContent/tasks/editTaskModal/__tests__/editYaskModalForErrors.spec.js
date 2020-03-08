import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Form } from 'antd';
import { initialState as store } from '../../../../../reducers';
import { Categories, EditTaskModal as WithoutWrapper } from '../editTaskModal';

const mockStore = configureStore();
const initialState = Map().merge(store);
const oldPath = '/task';
const taskTitle = 'Buy a new stearing wheal';
const description = 'This task is very important';

const newTestPath = 'categories-0';

jest.mock('../../../../../actions/actions', () => ({
  startEditTaskProcess: jest.fn(),
  clearReDo: () => {},
  decrementInDone: () => {},
}));
jest.mock('../../../../../sagas/execute', () => () => true);

describe('Unit test of edit task modal for errors', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  it('error should be shown, if validation error is', async () => {
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
    fragment.find(Categories).prop('onSelectCategory')([newTestPath]);
    await fragment.find(Form).prop('onSubmit')();
    expect(fragment).toMatchSnapshot();
  });
});
