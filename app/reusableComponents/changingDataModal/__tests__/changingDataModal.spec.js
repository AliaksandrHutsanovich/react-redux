import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Modal, Input } from 'antd';
import ChangingDataDialog, { ChangingDataDialog as WithoutWrapper } from '../changingDataModal';
import {
  startAddSubCategoryProcess,
  startEditCategoryProcess,
  startDeleteCategoryProcess,
} from '../../../actions/actions';
import {
  getSavingPath,
  getPathParam,
} from '../../../hightOrderComponents/utils/utils';

const mockStore = configureStore();
const initialState = {};
const dispatch = jest.fn();

// jest.mock('../../../hightOrderComponents/utils/utils', () => ({
//   typesCategoryOperation: {
//     'Add new subcategory': jest.fn(),
//   },
// }));

describe('Unit tests of add changing data dialog', () => {
  const store = mockStore(initialState);
  store.dispatch = dispatch;
  const Component = shallow(
    <ChangingDataDialog
      store={store}
      title="category"
      visible
      handleOk={() => {}}
      handleCancel={() => {}}
      path="/category"
      operationTitle="Add new subcategory"
    />,
  );

  const fragment = Component.shallow();
  it('full render test', () => {
    expect(fragment).toMatchSnapshot();
  });

  const withoutWrapper1 = shallow(
    <WithoutWrapper
      store={store}
      title="category"
      visible
      handleOk={() => {}}
      handleCancel={() => {}}
      path="/category"
      operationTitle="Add new subcategory"
      dispatch={dispatch}
    />,
  );

  it('input should be changable for adding new subcategory', () => {
    withoutWrapper1.find(Input).simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );

    withoutWrapper1.find(Modal).prop('onOk')();
    expect(dispatch)
      .toHaveBeenCalledWith(startAddSubCategoryProcess({
        path: ('/category-subCategories').split('-'),
        title: 'javascript',
      }));
  });

  const withoutWrapper2 = shallow(
    <WithoutWrapper
      store={store}
      title="sub-category"
      visible
      handleOk={() => {}}
      handleCancel={() => {}}
      path="/category-0-subCategories-0"
      operationTitle="Edit category"
      dispatch={dispatch}
    />,
  );

  it('input should be changable for editting category', () => {
    withoutWrapper2.find(Input).simulate(
      'change',
      {
        target: {
          value: 'java',
        },
      },
    );

    withoutWrapper2.find(Modal).prop('onOk')();
    expect(dispatch)
      .toHaveBeenCalledWith(startEditCategoryProcess({
        path: getSavingPath('/category-0-subCategories-0'),
        pathParam: getPathParam('/category-0-subCategories-0').param,
        title: 'java',
      }));
  });

  const withoutWrapper3 = shallow(
    <WithoutWrapper
      store={store}
      visible
      handleOk={() => {}}
      handleCancel={() => {}}
      path="/category-0-subCategories-0"
      operationTitle="Delete category"
      dispatch={dispatch}
    />,
  );

  it('category should be deletable', () => {
    withoutWrapper3.find(Modal).prop('onOk')();
    expect(dispatch)
      .toHaveBeenCalledWith(startDeleteCategoryProcess({
        path: getSavingPath('/category-0-subCategories-0'),
        pathParam: getPathParam('/category-0-subCategories-0').param,
      }));
  });
});
