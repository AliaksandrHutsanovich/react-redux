import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Map } from 'immutable';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Icon } from 'antd';
import { initialState as store } from '../../../../reducers/states/initialState';
import Category from '../category';
import ChangingDataModal from '../../../../reusableComponents/changingDataModal/changingDataModal';

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
    expect(fragment.find(ChangingDataModal).at(2).prop('visible')).toBeTruthy();

    fragment.find(ChangingDataModal).at(2).prop('handleOk')();
    expect(fragment.find(ChangingDataModal).at(2).prop('visible')).toBeFalsy();

    fragment.find(Icon).at(2).simulate('click');
    fragment.find(ChangingDataModal).at(2).prop('handleCancel')();
    expect(fragment.find(ChangingDataModal).at(2).prop('visible')).toBeFalsy();
  });
  it('Edit modal should be openable and closable', () => {
    fragment.find(Icon).at(0).simulate('click');
    expect(fragment.find(ChangingDataModal).at(1).prop('visible')).toBeTruthy();

    fragment.find(ChangingDataModal).at(1).prop('handleOk')();
    expect(fragment.find(ChangingDataModal).at(1).prop('visible')).toBeFalsy();

    fragment.find(Icon).at(0).simulate('click');
    fragment.find(ChangingDataModal).at(1).prop('handleCancel')();
    expect(fragment.find(ChangingDataModal).at(1).prop('visible')).toBeFalsy();
  });
  it('Add modal should be openable and closable', () => {
    fragment.find(Icon).at(1).simulate('click');
    expect(fragment.find(ChangingDataModal).at(0).prop('visible')).toBeTruthy();

    fragment.find(ChangingDataModal).at(0).prop('handleOk')();
    expect(fragment.find(ChangingDataModal).at(0).prop('visible')).toBeFalsy();

    fragment.find(Icon).at(1).simulate('click');
    fragment.find(ChangingDataModal).at(0).prop('handleCancel')();
    expect(fragment.find(ChangingDataModal).at(0).prop('visible')).toBeFalsy();
  });
});
