import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { initialState as store } from '../../../../../reducers/states/initialState';
import CardTitle from '../cardTitle';

const mockStore = configureStore();
const initialState = Map().merge(store);

describe('Unit test of card title component', () => {
  const dataStore = mockStore({ actionReducers: initialState });

  const Component = mount(
    <Provider store={dataStore}>
      <CardTitle
        title="graph"
        isFinished
        url="categories-0-tasks-0"
        index={0}
        description="draw"
      />
    </Provider>,
  );

  it('Full render test', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Status checkbox should be clickable', () => {
    Component.find('input[type="checkbox"]').simulate('click');
    const UnFinishedComponent = mount(
      <Provider store={dataStore}>
        <CardTitle
          title="graph"
          url="categories-0-tasks-0"
          index={0}
          description="draw"
          isFinished={false}
        />
      </Provider>,
    );
    UnFinishedComponent.find('input[type="checkbox"]').simulate('click');
  });

  it('Icon button for opening dialog should be cklickable', () => {
    Component.find('.anticon').simulate('click');
    Component.find('.ant-btn').at(0).simulate('click');
    Component.find('.ant-btn').at(1).simulate('click');
  });
});
