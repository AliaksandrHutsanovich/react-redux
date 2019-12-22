import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { List } from 'antd';
import { Provider } from 'react-redux';
import Tasks from '../tasks';
import { initialState as store } from '../../../../../reducers';

const initialState = Map().merge(store);
const mockStore = configureStore();

describe('Unit test of tasks component', () => {
  const dataStore = mockStore({ actionReducers: initialState });

  const wrapper = shallow(
    <Tasks
      showDone
      searchKey=""
      match={{ url: 'categories-0' }}
      store={dataStore}
    />,
  );

  it('Full render test of tasks component', () => {
    expect(wrapper.dive().shallow()).toMatchSnapshot();
    expect(wrapper.dive().shallow().find(List)
      .dive()).toMatchSnapshot();
    mount(
      <Provider store={dataStore}>
        <Tasks
          showDone
          searchKey=""
          match={{ url: 'categories-0' }}
        />
      </Provider>,
    );
  });
});
