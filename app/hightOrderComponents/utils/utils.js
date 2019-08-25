import {
  incrementInAll,
  startAddCategoryProcess,
  startAddTaskProcess,
  startAddSubCategoryProcess,
  startEditCategoryProcess,
  startDeleteCategoryProcess,
} from '../../actions/actions';

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
  'Add new category': (dispatch, value, addAction) => {
    if (value) {
      dispatch(addAction({ title: value }));
    }
  },
  'Add new task': (dispatch, value, addAction, url) => {
    if (value) {
      dispatch(incrementInAll());
      dispatch(addAction({ path: (url.replace('/', '') + '-tasks').split('-'), title: value }));
    }
  },
};

export const kindsOfAddActions = {
  'Add new category': startAddCategoryProcess,
  'Add new task': startAddTaskProcess,
};

export const typesCategoryOperation = {
  'Add new subcategory': (path, dispatch, value) => {
    dispatch(startAddSubCategoryProcess({ path: (path + '-subCategories').split('-'), title: value }));
  },
  'Edit category': (path, dispatch, value, title) => {
    dispatch(startEditCategoryProcess({
      path: getSavingPath(path),
      pathParam: getPathParam(path).param,
      title: value || title,
    }));
  },
  'Delete category': (path, dispatch) => {
    dispatch(startDeleteCategoryProcess({
      path: getSavingPath(path),
      pathParam: getPathParam(path).param,
    }));
  },
};
