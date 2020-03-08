/* eslint react/display-name: 0 */
import React, {
  useMemo,
  memo,
  useCallback,
} from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { typesCategoryOperation } from '../../hightOrderComponents';
import {
  resetOnOkByTypeOperation,
  resetOnCancelByTypeOperation,
  getIsErrorByOperation,
} from '../utils';
import renderForm from './renderForm';
import OPERATION_TITLES from '../../constants';
import FOOTER_BY_OPERATION_TITLE from './constants';
import usePrevious from '../../hooks';

const renderByOpearionTitle = {
  [OPERATION_TITLES.DELETE_CATEGORY]: (title) => <p>{title}</p>,
  [OPERATION_TITLES.EDIT_CATEGORY]: renderForm,
  [OPERATION_TITLES.ADD_NEW_SUBCATEGORY]: renderForm,
};

const getComponentActionsByOperationTitle = (handler) => ({
  [OPERATION_TITLES.DELETE_CATEGORY]: {
    modal: handler,
  },
  [OPERATION_TITLES.EDIT_CATEGORY]: {
    form: handler,
  },
  [OPERATION_TITLES.ADD_NEW_SUBCATEGORY]: {
    form: handler,
  },
});

export const ChangingDataDialog = (props) => {
  const {
    dispatch,
    title: categoryTitle,
    visible,
    handleOk,
    handleCancel,
    path,
    operationTitle,
    formId,
  } = props;

  const {
    handleSubmit,
    control,
    reset,
    errors,
    setError,
    getValues,
  } = useForm();
  const previousVisibleValue = usePrevious(visible);
  if (
    operationTitle === OPERATION_TITLES.EDIT_CATEGORY
    && getValues().title !== categoryTitle && visible
    && visible !== previousVisibleValue
  ) {
    reset({ title: categoryTitle });
  }

  const handleClickOk = useCallback(async (value) => {
    const isError = await getIsErrorByOperation[operationTitle](path, value, operationTitle);
    if (isError) {
      setError('title', 'notMatch', 'An item with the same name exists');
    } else {
      handleOk();
      typesCategoryOperation[operationTitle](path, dispatch, value, categoryTitle);
      resetOnOkByTypeOperation[operationTitle](reset);
    }
  }, [
    dispatch,
    operationTitle,
    path,
    categoryTitle,
    setError,
    handleOk,
    reset,
  ]);

  const handleCloseOnCancel = useCallback((title) => {
    handleCancel();
    resetOnCancelByTypeOperation[operationTitle](reset, title);
  }, [handleCancel, operationTitle, reset]);

  return (
    <Modal
      title={operationTitle}
      visible={visible}
      onOk={getComponentActionsByOperationTitle(handleClickOk)[operationTitle].modal}
      onCancel={() => handleCloseOnCancel(categoryTitle)}
      footer={FOOTER_BY_OPERATION_TITLE[operationTitle]}
    >
      {
        useMemo(
          () => renderByOpearionTitle[operationTitle](
            categoryTitle,
            getComponentActionsByOperationTitle(handleClickOk)[operationTitle].form,
            handleSubmit,
            control,
            errors,
            formId,
          ),
          [
            categoryTitle,
            control,
            errors,
            handleClickOk,
            handleSubmit,
            operationTitle,
            formId,
          ],
        )
      }
    </Modal>
  );
};

ChangingDataDialog.defaultProps = {
  title: '',
  formId: '',
};

ChangingDataDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  operationTitle: PropTypes.string.isRequired,
  formId: PropTypes.string,
};

export default connect()(memo(ChangingDataDialog));
