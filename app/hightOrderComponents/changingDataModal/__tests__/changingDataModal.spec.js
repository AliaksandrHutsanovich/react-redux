import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import changingDataModal from '../changingDataModal';

const mockStore = configureStore();
const initialState = {};
const CustomChangingDataModal = changingDataModal('Add new subcategory');

describe('Unit tests of add changing data dialog', () => {
  const store = mockStore(initialState);
  const Component = mount(
    <CustomChangingDataModal
      store={store}
      title="category"
      visible
      handleOk={() => {}}
      handleCancel={() => {}}
      path="/category"
    />,
  );

  it('full render test', () => {
    expect(Component).toMatchSnapshot();
  });

  it('input should be changable', () => {
    Component.find('input').simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );
    expect(Component.find('input').props().value).toEqual('javascript');
  });

  it('button Ok should be clickable', () => {
    Component.find('button').at(2).simulate('click');
  });
});
