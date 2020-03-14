import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Map } from 'immutable';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Icon } from 'antd';
import { initialState as store } from '../../../../reducers';
import Category from '../category';
import { ChangingDataDialog } from '../../../../reusableComponents';

const mockStore = configureStore();
const initialState = Map().merge(store);

describe('Unit test of Category component', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  const Component = shallow(
    <Provider store={dataStore}>
      <BrowserRouter>
        <Category
          path="category-0"
          title="My category"
        />
      </BrowserRouter>
    </Provider>,
  );

  const fragment = Component.find(Category).shallow();
  it('Full render test', () => {
    expect(fragment).toMatchSnapshot();
  });
  it('Delete modal should be openable', () => {
    fragment.find(Icon).at(2).simulate('click');
    expect(fragment.find(ChangingDataDialog).at(2).prop('visible')).toBeTruthy();

    fragment.find(ChangingDataDialog).at(2).prop('onOk')();
    expect(fragment.find(ChangingDataDialog).at(2).prop('visible')).toBeFalsy();

    fragment.find(Icon).at(2).simulate('click');
    fragment.find(ChangingDataDialog).at(2).prop('onCancel')();
    expect(fragment.find(ChangingDataDialog).at(2).prop('visible')).toBeFalsy();
  });
  it('Edit modal should be openable and closable', () => {
    fragment.find(Icon).at(0).simulate('click');
    expect(fragment.find(ChangingDataDialog).at(1).prop('visible')).toBeTruthy();

    fragment.find(ChangingDataDialog).at(1).prop('onOk')();
    expect(fragment.find(ChangingDataDialog).at(1).prop('visible')).toBeFalsy();

    fragment.find(Icon).at(0).simulate('click');
    fragment.find(ChangingDataDialog).at(1).prop('onCancel')();
    expect(fragment.find(ChangingDataDialog).at(1).prop('visible')).toBeFalsy();
  });
  it('Add modal should be openable and closable', () => {
    fragment.find(Icon).at(1).simulate('click');
    expect(fragment.find(ChangingDataDialog).at(0).prop('visible')).toBeTruthy();

    fragment.find(ChangingDataDialog).at(0).prop('onOk')();
    expect(fragment.find(ChangingDataDialog).at(0).prop('visible')).toBeFalsy();

    fragment.find(Icon).at(1).simulate('click');
    fragment.find(ChangingDataDialog).at(0).prop('onCancel')();
    expect(fragment.find(ChangingDataDialog).at(0).prop('visible')).toBeFalsy();
  });
});
