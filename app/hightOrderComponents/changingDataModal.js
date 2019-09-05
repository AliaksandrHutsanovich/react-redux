import React, { useState, memo } from 'react';
import 'antd/dist/antd.css';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearReDo } from '../actions/actions';
import { typesCategoryOperation } from './utils/utils';

function changingDataDialog(operationTitle) {
  const ChangingDataDialog = ({
    dispatch,
    title,
    visible,
    handleOk,
    titleCategory,
    handleCancel,
    path,
  }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const handleClickOk = () => {
      dispatch(clearReDo());
      typesCategoryOperation[operationTitle](path, dispatch, value, title);
      setValue('');
      handleOk();
    };

    return (
      <Modal
        title={operationTitle}
        visible={visible}
        onOk={() => handleClickOk(handleOk, path, dispatch, title)}
        onCancel={handleCancel}
      >
        {
          operationTitle === 'Delete category'
            ? <p>{titleCategory}</p>
            : (
              <Input
                placeholder="input category title"
                defaultValue={title}
                onChange={handleChange}
                className="modal-input"
              />
            )
        }
      </Modal>
    );
  };

  ChangingDataDialog.defaultProps = {
    title: '',
    titleCategory: '',
  };

  ChangingDataDialog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    titleCategory: PropTypes.string,
    handleCancel: PropTypes.func.isRequired,
  };

  return connect()(memo(ChangingDataDialog));
}

export default changingDataDialog;
