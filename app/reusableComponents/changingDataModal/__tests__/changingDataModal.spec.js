import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Modal, Input } from 'antd';
import ChangingDataModal from '../changingDataModal';
import { typesCategoryOperation } from '../../../hightOrderComponents/utils/utils';

const mockStore = configureStore();
const initialState = {};
const dispatch = jest.fn();

jest.mock('../../../hightOrderComponents/utils/utils', () => ({
  typesCategoryOperation: {
    'Add new subcategory': jest.fn(),
  },
}));

describe('Unit tests of add changing data dialog', () => {
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const Component = shallow(
    <ChangingDataModal
      store={store}
      title="category"
      visible
      handleOk={() => {}}
      handleCancel={() => {}}
      path="/category"
      operationTitle="Add new subcategory"
    />,
  );

  const fragment = Component.dive();
  it('full render test', () => {
    expect(fragment).toMatchSnapshot();
  });

  it('input should be changable', () => {
    fragment.find(Input).simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );

    fragment.find(Modal).prop('onOk')();
    expect(typesCategoryOperation['Add new subcategory'])
      .toHaveBeenCalledWith('/category', dispatch, 'javascript', 'category');
  });
});
