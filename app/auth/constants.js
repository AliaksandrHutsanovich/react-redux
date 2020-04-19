export const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
    md: { span: 6 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 8, offset: 2 },
    sm: { span: 8, offset: 2 },
    md: { span: 8, offset: 2 },
    lg: { span: 8, offset: 2 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const emailValidationRules = [
  {
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  {
    required: true,
    message: 'Please input your E-mail!',
  },
];

export const passwordValidationRules = [
  {
    required: true,
    message: 'Please input your password!',
  },
];

export const confirmPasswordValidationRules = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
];

export const fieldTitles = {
  password: 'password',
  confirm: 'confirm',
};

export const formTypes = {
  signUp: 'signUp',
  logIn: 'logIn',
};

export const isValidateByFormType = {
  [formTypes.signUp]: true,
  [formTypes.logIn]: false,
};

export const buttonTitleByFormType = {
  [formTypes.signUp]: 'Register',
  [formTypes.logIn]: 'Log in',
};
