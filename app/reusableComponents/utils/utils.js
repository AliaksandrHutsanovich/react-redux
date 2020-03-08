import OPERATION_TITLES from '../../constants';
import { getPathByOperation } from '../../hightOrderComponents';
import { validate, execute } from '../../sagas';

export const resetOnOkByTypeOperation = {
  [OPERATION_TITLES.ADD_NEW_SUBCATEGORY]: (reset) => reset({ title: '' }),
  [OPERATION_TITLES.EDIT_CATEGORY]: () => {},
  [OPERATION_TITLES.DELETE_CATEGORY]: () => {},
};

export const resetOnCancelByTypeOperation = {
  [OPERATION_TITLES.ADD_NEW_SUBCATEGORY]: (reset) => reset({ title: '' }),
  [OPERATION_TITLES.EDIT_CATEGORY]: (reset, title) => reset({ title }),
  [OPERATION_TITLES.DELETE_CATEGORY]: () => {},
};

const getIsError = (path, value, operationTitle) => execute(
  validate, {
    payload: {
      path: getPathByOperation[operationTitle](path),
      title: value,
    },
  },
);

export const getIsErrorByOperation = {
  [OPERATION_TITLES.ADD_NEW_SUBCATEGORY]: getIsError,
  [OPERATION_TITLES.EDIT_CATEGORY]: getIsError,
  [OPERATION_TITLES.DELETE_CATEGORY]: () => false,
};
