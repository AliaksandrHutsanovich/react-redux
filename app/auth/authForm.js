import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form } from 'antd';
import {
  formItemLayout,
  fieldTitles,
  isValidateByFormType,
  buttonTitleByFormType,
  formTypes,
} from './constants';
import { getFormFields, getSubmitButton } from './formFields';

const AuthForm = ({ form, type }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const {
    getFieldDecorator,
    getFieldValue,
    validateFields,
  } = form;

  const argsByField = {
    [fieldTitles.confirm]: [getFieldValue],
    [fieldTitles.password]: [validateFields, confirmDirty],
  };

  const handleSubmit = (e) => {
    const { validateFieldsAndScroll } = form;
    e.preventDefault();
    validateFieldsAndScroll();
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const formFields = getFormFields[type].map(
    (getField, index) => getField(
      index,
      getFieldDecorator,
      isValidateByFormType[type],
      argsByField,
      handleConfirmBlur,
    ),
  );

  const submitButton = getSubmitButton(buttonTitleByFormType[type]);

  return (
    <Form
      {...formItemLayout}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {formFields}
      {submitButton}
    </Form>
  );
};

AuthForm.propTypes = {
  form: PropTypes.shape({
    getFieldValue: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(Object.values(formTypes)).isRequired,
};

const WrappedAuthForm = Form.create({
  name: 'register',
})(AuthForm);

export default WrappedAuthForm;
