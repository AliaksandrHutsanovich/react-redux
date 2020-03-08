import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Typography } from 'antd';

import styles from './changingDataModal.css';

const { Text } = Typography;

const renderForm = (
  categoryTitle,
  handleClickOk,
  handleSubmit,
  control,
  errors,
  formId,
) => (
  <form
    id={formId}
    autoComplete="off"
    onSubmit={handleSubmit(({ title }) => handleClickOk(title))}
  >
    <Controller
      as={(
        <Input
          placeholder="input category title"
          className={styles.modalInput}
        />
      )}
      rules={{ required: 'This is required' }}
      control={control}
      name="title"
      defaultValue={categoryTitle}
    />
    {
      errors.title
        && (
          <Text
            type="danger"
          >
            {errors.title.message}
          </Text>
        )
    }
  </form>
);

export default renderForm;
