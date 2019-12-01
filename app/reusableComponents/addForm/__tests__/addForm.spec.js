import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Input, Button } from 'antd';
import AddForm from '../addForm';

const mockStore = configureStore();
const initialState = {};
const dispatch = jest.fn();

describe('Unit tests of add form component', () => {
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const Component = shallow(<AddForm placeholder="Add new category" store={store} />);
  it('full render test', () => {
    expect(Component.dive()).toMatchSnapshot();
  });

  const fragment = Component.dive();
  it('input should be changable', () => {
    fragment.find(Input).simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    expect(fragment.find(Input).prop('value')).toEqual('javascript');
  });

  it('button should be clickable', () => {
    fragment.find(Button).simulate('click');
    expect(dispatch).toHaveBeenCalled();
  });
});
