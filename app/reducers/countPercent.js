import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  countPercentage,
  incrementInDone,
  decrementInDone,
  incrementInAll,
  decrementInAll,
} from '../actions';

const countPerсent = handleActions({
  [countPercentage]: {
    next(state, { payload: { done, all } }) {
      return state
        .set('done', done)
        .set('all', all);
    },
  },

  [incrementInDone]: {
    next(state) {
      const done = state.get('done') + 1;
      return state.set('done', done);
    },
  },

  [decrementInDone]: {
    next(state) {
      const done = state.get('done') - 1;
      return state.set('done', done);
    },
  },

  [incrementInAll]: {
    next(state) {
      const all = state.get('all') + 1;
      return state.set('all', all);
    },
  },

  [decrementInAll]: {
    next(state) {
      const all = state.get('all') - 1;
      return state.set('all', all);
    },
  },
}, Map({ done: 0, all: 0 }));

export default countPerсent;
