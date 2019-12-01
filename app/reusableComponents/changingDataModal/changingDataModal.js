import React, { useState, memo } from 'react';
import 'antd/dist/antd.css';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearReDo } from '../../actions/actions';
import { typesCategoryOperation } from '../../hightOrderComponents/utils/utils';

import styles from './changingDataModal.css';

const ChangingDataDialog = ({
  dispatch,
  title,
  visible,
  handleOk,
  titleCategory,
  handleCancel,
  path,
  operationTitle,
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
              className={styles.modalInput}
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
  operationTitle: PropTypes.string.isRequired,
};

export default connect()(memo(ChangingDataDialog));
