import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { Controller } from 'react-hook-form';
import { Modal } from 'antd';
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
jest.mock('../../../sagas/execute', () => () => false);

describe('Unit tests of add changing data dialog', () => {
  const store = mockStore(initialState);
  store.dispatch = dispatch;

  it('full render test', () => {
    const Component = shallow(
      <ChangingDataDialog
        store={store}
        title="category"
        visible
        onOk={() => { }}
        onCancel={() => { }}
        path="/category"
        operationTitle="Add new subcategory"
      />,
    );
    const fragment = Component.shallow();
    expect(fragment).toMatchSnapshot();
  });

  it('input should be changable for adding new subcategory', async () => {
    const withoutWrapper1 = shallow(
      <WithoutWrapper
        store={store}
        title="category"
        visible
        onOk={() => { }}
        onCancel={() => { }}
        path="/category"
        operationTitle="Add new subcategory"
        dispatch={dispatch}
      />,
    );

    const input = withoutWrapper1.find(Controller).dive();
    input.simulate(
      'change',
      {
        target: {
          value: 'javascript',
        },
      },
    );

    await act(async () => {
      withoutWrapper1.find('form').prop('onSubmit')();
    });
    expect(dispatch)
      .toHaveBeenCalledWith(startAddSubCategoryProcess({
        path: ('/category-subCategories').split('-'),
        title: 'javascript',
      }));
  });

  it('input should be changable for editting category', async () => {
    const withoutWrapper2 = shallow(
      <WithoutWrapper
        store={store}
        title="sub-category"
        visible
        onOk={() => { }}
        onCancel={() => { }}
        path="/category-0-subCategories-0"
        operationTitle="Edit category"
        dispatch={dispatch}
      />,
    );

    const input = withoutWrapper2.find(Controller).dive();
    input.simulate(
      'change',
      {
        target: {
          value: 'java',
        },
      },
    );

    await act(async () => {
      withoutWrapper2.find('form').prop('onSubmit')();
    });
    expect(dispatch)
      .toHaveBeenCalledWith(startEditCategoryProcess({
        path: getSavingPath('/category-0-subCategories-0'),
        pathParam: getPathParam('/category-0-subCategories-0').param,
        title: 'java',
      }));
  });

  it('category should be deletable', async () => {
    const withoutWrapper3 = shallow(
      <WithoutWrapper
        store={store}
        visible
        onOk={() => { }}
        onCancel={() => { }}
        path="/category-0-subCategories-0"
        operationTitle="Delete category"
        dispatch={dispatch}
      />,
    );

    await act(async () => {
      withoutWrapper3.find(Modal).prop('onOk')();
    });
    expect(dispatch)
      .toHaveBeenCalledWith(startDeleteCategoryProcess({
        path: getSavingPath('/category-0-subCategories-0'),
        pathParam: getPathParam('/category-0-subCategories-0').param,
      }));
  });
});
