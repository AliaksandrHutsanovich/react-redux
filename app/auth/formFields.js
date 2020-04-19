import React from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import {
  emailValidationRules,
  passwordValidationRules,
  confirmPasswordValidationRules,
  fieldTitles,
  formTypes,
  tailFormItemLayout,
} from './constants';
import validatorByField from './utils';

const getEmailField = (index, getFieldDecorator) => (
  <Form.Item label="E-mail" key={index}>
    {getFieldDecorator('email', {
      rules: emailValidationRules,
    })(<Input />)}
  </Form.Item>
);

const getPasswordField = (index, getFieldDecorator, isValidate, argsByFieldTitle) => (
  <Form.Item label="Password" hasFeedback key={index}>
    {getFieldDecorator(fieldTitles.password, {
      rules: isValidate
        ? [...passwordValidationRules, {
          validator: validatorByField[fieldTitles.password](
            ...argsByFieldTitle[fieldTitles.password],
          ),
        }] : [...passwordValidationRules],
    })(<Input.Password />)}
  </Form.Item>
);

const getConfirmPasswordField = (
  index,
  getFieldDecorator,
  isValidate, argsByFieldTitle,
  onConfirmBlur,
) => (
  <Form.Item label="Confirm Password" hasFeedback key={index}>
    {getFieldDecorator(fieldTitles.confirm, {
      rules: [
        ...confirmPasswordValidationRules,
        {
          validator: validatorByField[fieldTitles.confirm](
            ...argsByFieldTitle[fieldTitles.confirm],
          ),
        },
      ],
    })(<Input.Password onBlur={onConfirmBlur} />)}
  </Form.Item>
);

export const getSubmitButton = (title) => (
  <Form.Item {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
      {title}
    </Button>
  </Form.Item>
);

export const getFormFields = {
  [formTypes.signUp]: [
    getEmailField,
    getPasswordField,
    getConfirmPasswordField,
  ],
  [formTypes.logIn]: [
    getEmailField,
    getPasswordField,
  ],
};
