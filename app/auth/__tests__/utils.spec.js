import validatorByField from '../utils';
import { fieldTitles } from '../constants';

describe('utils test', () => {
  const callback = jest.fn();
  it('validator for field "confirm" should work properly', () => {
    const getConfirmValidator = validatorByField[fieldTitles.confirm];
    const confirmValidator = getConfirmValidator(() => '1111');

    confirmValidator(null, '2222', callback);
    expect(callback).toHaveBeenCalledWith('Two passwords that you enter is inconsistent!');

    confirmValidator(null, '1111', callback);
    expect(callback).toHaveBeenCalled();
  });

  it('validator for field "password" should work properly', () => {
    const validateFields = jest.fn();
    const getPasswordValidator = validatorByField[fieldTitles.password];
    const passwordValidator = getPasswordValidator(validateFields, true);

    passwordValidator(null, '1111', callback);
    expect(validateFields).toHaveBeenCalled();

    passwordValidator(null, '', callback);
    expect(callback).toHaveBeenCalled();
  });
});
