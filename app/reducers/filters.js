import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  showDoneTasks,
  searchTasks,
} from '../actions';

const filters = handleActions({

  [showDoneTasks]: {
    next(state, { payload }) {
      return state.set('showDone', payload);
    },
  },

  [searchTasks]: {
    next(state, { payload }) {
      return state.set('searchKey', payload);
    },
  },

}, Map({ showDone: true, searchKey: '' }));

export default filters;
