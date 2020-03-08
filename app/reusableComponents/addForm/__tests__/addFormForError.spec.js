import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { Typography } from 'antd';
import configureStore from 'redux-mock-store';
import { Controller } from 'react-hook-form';
import { AddForm as WithoutWrapper } from '../addForm';

const mockStore = configureStore();
const initialState = {};
const dispatch = jest.fn();
jest.mock('../../../sagas/execute', () => () => true);

const { Text } = Typography;

describe('Unit tests of add form component for error in form', () => {
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const fragment = shallow(<WithoutWrapper placeholder="Add new category" dispatch={dispatch} />);
  const inputCategory = fragment.find(Controller).dive();

  it('error should be shown when validation error is occured', async () => {
    inputCategory.simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    await act(async () => {
      fragment.find('form').prop('onSubmit')();
    });
    expect(fragment.find(Text).childAt(0).text()).toEqual('Item with such name exists');
  });

  it('error should be hidden after onBlur was invoked', async (done) => {
    await fragment.find('form').prop('onBlur')();
    setTimeout(() => {
      expect(fragment.find(Text).length).toEqual(0);
      done();
    }, 300);
  });

  it('error should be shown when empty value in input', async () => {
    inputCategory.simulate(
      'change',
      {
        target: {
          value: '',
        },
      },
    );
    await act(async () => {
      fragment.find('form').prop('onSubmit')();
    });
    expect(fragment.find(Text).childAt(0).text()).toEqual('This is required');
  });

  it('error should be hidden after onBlur was invoked', async (done) => {
    await fragment.find('form').prop('onBlur')();
    setTimeout(() => {
      expect(fragment.find(Text).length).toEqual(0);
      done();
    }, 300);
  });
});
