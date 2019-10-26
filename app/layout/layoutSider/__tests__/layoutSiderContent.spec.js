import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initialState as store } from '../../../reducers/states/initialState';
import LayoutSiderContent from '../layoutSiderContent';

const mockStore = configureStore();
const initialState = Map().merge(store);

describe('Unit test of layout sider content component', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  const Component = mount(
    <Provider store={dataStore}>
      <BrowserRouter>
        <LayoutSiderContent />
      </BrowserRouter>
    </Provider>,
  );
  it('Full render test', () => {
    expect(Component).toMatchSnapshot();
  });
});
