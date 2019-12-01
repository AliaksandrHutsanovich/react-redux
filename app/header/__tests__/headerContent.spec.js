import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';
import configureStore from 'redux-mock-store';
import { Button } from 'antd';
import HeaderContent from '../headerContent';

const mockStore = configureStore();
const initialState = {
  unDoReducer: Map({
    undoOperations: List([{}, {}]),
  }),
  reDoReducer: Map({
    redoOperations: List([{}, {}]),
  }),
  countPerсent: Map({ done: 5, all: 10 }),
};

describe('Unit test of HeaderContent', () => {
  const dispatch = jest.fn();
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const Component = shallow(<HeaderContent store={store} />);

  it('full render test', () => {
    expect(Component.shallow().shallow()).toMatchSnapshot();
  });

  it('should be clickable', () => {
    Component.shallow().shallow().find(Button)
      .first()
      .simulate('click');
    expect(dispatch).toHaveBeenCalled();

    Component.shallow().shallow().find(Button)
      .at(1)
      .simulate('click');
    expect(dispatch).toHaveBeenCalled();
  });
});
