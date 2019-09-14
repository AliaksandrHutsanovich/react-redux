import React, { useState, memo } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { clearReDo } from '../../actions/actions';
import { caseClickHandlers, kindsOfAddActions } from '../utils/utils';

import styles from './addForm.css';

const addForm = (placeholder) => {
  const AddForm = (props) => {
    const { url, dispatch } = props;
    const [value, setValue] = useState('');
    const addAction = kindsOfAddActions[placeholder];

    const changeValue = (event) => {
      setValue(event.target.value);
    };

    const clickButton = () => {
      dispatch(clearReDo());
      caseClickHandlers[placeholder](dispatch, value, addAction, url);
      setValue('');
    };

    return (
      <div className={styles.formWrapper}>
        <Input
          placeholder={placeholder}
          className={styles.input}
          value={value}
          onChange={changeValue}
        />
        <Button
          type="primary"
          className={styles.button}
          onClick={() => { clickButton(addAction); }}
        >
          Add
        </Button>
      </div>
    );
  };

  AddForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    url: PropTypes.string,
  };

  AddForm.defaultProps = {
    url: '',
  };

  return connect()(memo(AddForm));
};

export default addForm;