import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { Controller } from 'react-hook-form';
import { Modal, Typography } from 'antd';
import { ChangingDataDialog as WithoutWrapper } from '../changingDataModal';

const { Text } = Typography;

const mockStore = configureStore();
const initialState = {};
const dispatch = jest.fn();

jest.mock('../../../sagas/execute', () => () => true);

describe('Unit tests of add changing data dialog for errors', () => {
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const testFn = jest.fn();

  const withoutWrapper1 = shallow(
    <WithoutWrapper
      store={store}
      title="category"
      visible
      onOk={() => { }}
      onCancel={testFn}
      path="/category"
      operationTitle="Add new subcategory"
      dispatch={dispatch}
    />,
  );

  const input = withoutWrapper1.find(Controller).dive();

  it('full render test', async () => {
    input.simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );

    await act(async () => {
      withoutWrapper1.find('form').prop('onSubmit')();
    });
    expect(withoutWrapper1.find(Text).childAt(0).text()).toEqual('An item with the same name exists');
  });

  it('modal should be closable', () => {
    withoutWrapper1.find(Modal).prop('onCancel')();
    expect(testFn).toHaveBeenCalled();
  });

  it('the error about required value should be shown', async () => {
    input.simulate(
      'change',
      {
        target: {
          value: '',
        },
      },
    );
    await act(async () => {
      withoutWrapper1.find('form').prop('onSubmit')();
    });
    expect(withoutWrapper1.find(Text).childAt(0).text()).toEqual('This is required');
  });
});
