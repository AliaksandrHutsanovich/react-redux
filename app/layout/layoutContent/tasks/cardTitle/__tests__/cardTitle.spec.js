import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Checkbox, Icon } from 'antd';
import { initialState as store } from '../../../../../reducers/states/initialState';
import CardTitle, { LoadableModal } from '../cardTitle';

const mockStore = configureStore();
const initialState = Map().merge(store);

describe('Unit test of card title component', () => {
  const dispatch = jest.fn();
  const dataStore = mockStore({ actionReducers: initialState });
  dataStore.dispatch = dispatch;

  const Component = shallow(
    <CardTitle
      title="graph"
      isFinished
      url="categories-0-tasks-0"
      index={0}
      description="draw"
      store={dataStore}
    />,
  );

  it('Full render test', () => {
    expect(Component.dive()).toMatchSnapshot();
    expect(Component.dive().find(LoadableModal).dive()).toMatchSnapshot();
    expect(Component.dive().find(LoadableModal).dive().dive()).toMatchSnapshot();
  });

  it('Status checkbox should be clickable', () => {
    Component.dive().find(Checkbox).simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(dispatch).toHaveBeenCalled();
    Component.dive().find(Checkbox).simulate('change', {
      target: {
        checked: false,
      },
    });
    expect(dispatch).toHaveBeenCalled();
  });

  const fragment = Component.dive();

  it('Icon button for opening dialog should be clickable', () => {
    fragment.find(Icon).simulate('click');
    expect(fragment.state().visible).toBeTruthy();
  });

  it('Dialog should closable when click on cancel button', async () => {
    fragment.find(LoadableModal).prop('handleCancel')();
    expect(fragment.state().visible).toBeFalsy();
  });

  it('Dialog should closable when click on OK button', async () => {
    fragment.find(LoadableModal).prop('handleOk')();
    expect(fragment.state().visible).toBeFalsy();
  });
});
