/* eslint react/display-name: 0 */
import React, { useState, memo, useCallback } from 'react';
import 'antd/dist/antd.css';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearReDo } from '../../actions';
import { typesCategoryOperation } from '../../hightOrderComponents';

import styles from './changingDataModal.css';

const renderByOpearionTitle = {
  'Delete category': (title) => <p>{title}</p>,
  'Edit category': (title, handleChange, className) => (
    <Input
      placeholder="input category title"
      defaultValue={title}
      onChange={handleChange}
      className={className}
    />
  ),
  'Add new subcategory': (title, handleChange, className, value) => (
    <Input
      placeholder="input category title"
      value={value}
      onChange={handleChange}
      className={className}
    />
  ),
};

export const ChangingDataDialog = ({
  dispatch,
  title,
  visible,
  handleOk,
  handleCancel,
  path,
  operationTitle,
}) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleClickOk = useCallback(() => {
    dispatch(clearReDo());
    typesCategoryOperation[operationTitle](path, dispatch, value, title);
    setValue('');
    handleOk();
  }, [dispatch, handleOk, operationTitle, path, title, value]);

  return (
    <Modal
      title={operationTitle}
      visible={visible}
      onOk={() => handleClickOk(handleOk, path, dispatch, title)}
      onCancel={handleCancel}
    >
      {renderByOpearionTitle[operationTitle](title, handleChange, styles.modalInput, value)}
    </Modal>
  );
};

ChangingDataDialog.defaultProps = {
  title: '',
};

ChangingDataDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  operationTitle: PropTypes.string.isRequired,
};

export default connect()(memo(ChangingDataDialog));
