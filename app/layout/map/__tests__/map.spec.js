import React from 'react';
import { shallow } from 'enzyme';
import { Map as LeafletMap } from 'react-leaflet';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import WorldMap from '../map';
import { initialState as store } from '../../../reducers';

const contentDisplay = Map().merge({ isDisplayed: false, url: 'categories-0-tasks-0' });
const actionReducers = Map().merge(store);
const mockStore = configureStore();

describe('Unit test of map component', () => {
  const dispatch = jest.fn();
  const dataStore = mockStore({
    contentDisplay,
    actionReducers,
  });
  dataStore.dispatch = dispatch;

  const wrapper = shallow(
    <WorldMap store={dataStore} />,
  );
  const fragment = wrapper.dive().shallow();
  it('shallow render test', () => {
    expect(fragment).toMatchSnapshot();
  });

  it('leallet map should be clickable', () => {
    fragment.find(LeafletMap).simulate('click', { latlng: {} });
    expect(dispatch).toHaveBeenCalled();
  });
});
