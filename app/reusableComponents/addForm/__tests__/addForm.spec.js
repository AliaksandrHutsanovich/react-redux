import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Controller } from 'react-hook-form';
import AddForm, { AddForm as WithoutWrapper } from '../addForm';

const mockStore = configureStore();
const initialState = {};
const dispatch = jest.fn();
jest.mock('../../../sagas/execute', () => () => false);

describe('Unit tests of add form component', () => {
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const Component = shallow(<AddForm placeholder="Add new category" store={store} />);
  it('full render test', () => {
    expect(Component.shallow()).toMatchSnapshot();
  });

  const fragment = shallow(<WithoutWrapper placeholder="Add new category" dispatch={dispatch} />);
  const inputCategory = fragment.find(Controller).dive();
  it('input should be changable for adding new category', () => {
    inputCategory.simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    expect(inputCategory.prop('value')).toEqual('javascript');
  });

  it('form should be sent to add new category', async () => {
    await act(async () => {
      fragment.find('form').prop('onSubmit')();
    });
    expect(dispatch).toHaveBeenCalled();
  });

  const withoutWrapper = shallow(<WithoutWrapper placeholder="Add new task" dispatch={dispatch} />);
  const inputTask = withoutWrapper.find(Controller).dive();
  it('input should be changable for adding new task', () => {
    inputTask.simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    expect(inputTask.prop('value')).toEqual('javascript');
  });

  it('form should be sentable for adding new task', async () => {
    await act(async () => {
      withoutWrapper.find('form').prop('onSubmit')();
    });
    expect(dispatch).toHaveBeenCalled();
  });
});
