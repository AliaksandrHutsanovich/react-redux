import React from 'react';
import { shallow } from 'enzyme';
import { Input, Form } from 'antd';
import AuthForm from '../authForm';
import { formTypes } from '../constants';

const { Password } = Input;


describe('<AuthForm />', () => {
  const signUp = shallow(<AuthForm type={formTypes.signUp} />);
  const preventDefault = jest.fn();

  it('Sign up form should render properly', () => {
    expect(signUp).toMatchSnapshot();
  });

  it('Log in form should render properly', () => {
    const logIn = shallow(<AuthForm type={formTypes.logIn} />).shallow();
    expect(logIn).toMatchSnapshot();
  });

  it('form should work', () => {
    signUp.shallow().find(Input).at(0).simulate('change', {
      target: {
        value: 'gu-84@ret.tu',
      },
    });
    signUp.shallow().find(Password).at(0).simulate('change', {
      target: {
        value: '12345',
      },
    });
    signUp.shallow().find(Password).at(1).simulate('change', {
      target: {
        value: '12345',
      },
    });

    signUp.shallow().find(Password).at(1).simulate('blur', {
      target: {
        value: '12345',
      },
    });

    signUp.shallow().find(Form).prop('onSubmit')({ preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(signUp.prop('form').getFieldsValue(['email', 'password'])).toEqual({
      email: 'gu-84@ret.tu',
      password: '12345',
    });
  });
});
