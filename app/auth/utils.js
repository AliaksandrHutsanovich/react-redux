import { fieldTitles } from './constants';

const validatorByField = {
  [fieldTitles.confirm]: (getFieldValue) => (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  [fieldTitles.password]: (validateFields, confirmDirty) => (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  },
};

export default validatorByField;
