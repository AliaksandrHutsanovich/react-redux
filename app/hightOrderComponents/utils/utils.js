import OPERATION_TITLES from '../../constants';
import {
  incrementInAll,
  startAddCategoryProcess,
  startAddTaskProcess,
  startAddSubCategoryProcess,
  startEditCategoryProcess,
  startDeleteCategoryProcess,
} from '../../actions';

export const getPathParam = (path) => ({
  savingPath: path.split('-'),
  param: path.split('-')[path.split('-').length - 1],
});

export const getSavingPath = (path) => {
  const { savingPath } = getPathParam(path);
  savingPath.pop();
  return savingPath;
};

export const caseClickHandlers = {
  [OPERATION_TITLES.ADD_NEW_CATEGORY]: (dispatch, title, addAction) => {
    dispatch(addAction({ title }));
  },
  [OPERATION_TITLES.ADD_NEW_TASK]: (dispatch, title, addAction, url) => {
    dispatch(incrementInAll());
    dispatch(addAction({ path: (url.replace('/', '') + '-tasks').split('-'), title }));
  },
};

export const kindsOfAddActions = {
  [OPERATION_TITLES.ADD_NEW_CATEGORY]: startAddCategoryProcess,
  [OPERATION_TITLES.ADD_NEW_TASK]: startAddTaskProcess,
};

export const getPathByOperation = {
  [OPERATION_TITLES.ADD_NEW_SUBCATEGORY]: (path) => (path + '-subCategories').split('-'),
  [OPERATION_TITLES.EDIT_CATEGORY]: (path) => getSavingPath(path),
};

export const typesCategoryOperation = {
  [OPERATION_TITLES.ADD_NEW_SUBCATEGORY]: (path, dispatch, value) => {
    dispatch(startAddSubCategoryProcess({
      path: (path + '-subCategories').split('-'),
      title: value,
    }));
  },
  [OPERATION_TITLES.EDIT_CATEGORY]: (path, dispatch, value, title) => {
    dispatch(startEditCategoryProcess({
      path: getSavingPath(path),
      pathParam: getPathParam(path).param,
      title: value || title,
    }));
  },
  [OPERATION_TITLES.DELETE_CATEGORY]: (path, dispatch) => {
    dispatch(startDeleteCategoryProcess({
      path: getSavingPath(path),
      pathParam: getPathParam(path).param,
    }));
  },
};

export const formNameByPlaceholder = {
  [OPERATION_TITLES.ADD_NEW_CATEGORY]: 'addCategoryForm',
  [OPERATION_TITLES.ADD_NEW_TASK]: 'addTaskForm',
};
