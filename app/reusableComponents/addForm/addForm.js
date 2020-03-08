import React, { memo, useCallback } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Input, Button, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  caseClickHandlers,
  kindsOfAddActions,
  formNameByPlaceholder,
} from '../../hightOrderComponents';
import { validate, execute } from '../../sagas';

import styles from './addForm.css';

const { Text } = Typography;

export const AddForm = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    errors,
    watch,
    setError,
  } = useForm();
  const {
    url,
    dispatch,
    placeholder,
  } = props;

  const addAction = kindsOfAddActions[placeholder];

  const onSubmit = useCallback(async ({ title }) => {
    const isError = await execute(
      validate, {
        payload: {
          path: url ? (url.replace('/', '') + '-tasks').split('-') : ['categories'],
          title,
        },
      },
    );
    if (isError) {
      setError('title', 'notMatch', 'Item with such name exists');
    } else {
      caseClickHandlers[placeholder](dispatch, title, addAction, url);
      reset({ title: '' });
    }
  }, [placeholder, addAction, dispatch, url, reset, setError]);

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formWrapper}
      name={formNameByPlaceholder[placeholder]}
      onBlur={() => {
        const value = watch('title');
        if (value) {
          setTimeout(() => reset({ title: '' }), 200);
        } else {
          reset({ title: '' });
        }
      }}
    >
      <Controller
        as={(
          <Input
            placeholder={placeholder}
            className={styles.input}
          />
        )}
        rules={{ required: 'This is required' }}
        control={control}
        name="title"
      />
      <Button
        type="primary"
        className={styles.button}
        htmlType="submit"
      >
        Add
      </Button>
      {
        errors.title
          && (
            <Text
              className={styles.error}
              type="danger"
            >
              {errors.title.message}
            </Text>
          )
      }
    </form>
  );
};

AddForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  url: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};

AddForm.defaultProps = {
  url: '',
};

export default connect()(memo(AddForm));
