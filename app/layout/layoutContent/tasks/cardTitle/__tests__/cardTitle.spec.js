import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import { Checkbox, Icon } from 'antd';
import { initialState as store } from '../../../../../reducers';
import CardTitle, { LoadableModal, CardTitle as WithoutWrapper } from '../cardTitle';

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
    expect(Component.shallow()).toMatchSnapshot();
    expect(Component.shallow().find(LoadableModal).dive()).toMatchSnapshot();
    expect(Component.shallow().find(LoadableModal).dive()
      .dive()).toMatchSnapshot();
  });

  it('Status checkbox should be clickable', () => {
    Component.shallow().find(Checkbox).simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(dispatch).toHaveBeenCalled();
    Component.shallow().find(Checkbox).simulate('change', {
      target: {
        checked: false,
      },
    });
    expect(dispatch).toHaveBeenCalled();
  });

  const Component1 = shallow(<WithoutWrapper
    title="graph"
    isFinished
    url="categories-0-tasks-0"
    index={0}
    description="draw"
    dispatch={() => {}}
  />);
  const fragment = Component1;

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
