import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Checkbox, Input } from 'antd';
import Filters from '../filters';

const mockStore = configureStore();
const initialState = {};

// jest.mock('../filters', () => ({
//   onChange: (e, dispatch) => dispatch(),
//   onChangePattern: (e, dispatch) => dispatch(),
// }));

describe('Unit test of filters', () => {
  const dispatch = jest.fn();
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const Component = shallow(<Filters store={store} searchKey="" showDone />);
  it('full render test', () => {
    expect(Component.shallow()).toMatchSnapshot();
  });

  it('checkbox should be clickable', () => {
    Component.shallow().find(Checkbox).simulate(
      'change',
      {
        target: {
          checked: true,
        },
      },
    );
    expect(dispatch).toHaveBeenCalled();
  });

  it('input text should be changable', () => {
    Component.shallow().find(Input).simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    expect(dispatch).toHaveBeenCalled();
  });
});
