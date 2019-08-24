import {
  incrementInAll,
  startAddCategoryProcess,
  startAddTaskProcess,
} from '../../actions/actions';

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
