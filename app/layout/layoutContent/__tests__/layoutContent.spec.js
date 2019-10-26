import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { initialState as store } from '../../../reducers/states/initialState';
import LayoutContent from '../layoutContent';

const mockStore = configureStore();
const initialState = Map().merge(store);

jest.mock('rc-animate', () => () => <div />); //eslint-disable-line

describe('Unit test of layout content component', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  const Component = mount(
    <Provider store={dataStore}>
      <LayoutContent
        showDone
        searchKey=""
        match={{ url: 'categories-0' }}
      />
    </Provider>,
  );
  it('Full render test', () => {
    expect(Component).toMatchSnapshot();
  });
});
