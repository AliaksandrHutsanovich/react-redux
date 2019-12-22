import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { initialState as store } from '../../../reducers';
import LayoutContent from '../layoutContent';

const mockStore = configureStore();
const initialState = Map().merge(store);

jest.mock('rc-animate', () => () => <div />); //eslint-disable-line

describe('Unit test of layout content component', () => {
  const dataStore = mockStore({ actionReducers: initialState });
  const Component = shallow(
    <Provider store={dataStore}>
      <LayoutContent
        showDone
        searchKey=""
        match={{ url: 'categories-0' }}
      />
    </Provider>,
  );
  it('Full render test', () => {
    expect(Component.shallow().shallow()).toMatchSnapshot();
  });
});
