import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { addToUnDo, deleteFromUnDo } from '../actions/actions';

const unDoReducer = handleActions({

  [addToUnDo]: {
    next(state, { payload }) {
      return state.update('undoOperations', (operations) => operations.push(Map(payload)));
    },
  },

  [deleteFromUnDo]: {
    next(state) {
      return state.update('undoOperations', (operations) => operations.delete(state.get('undoOperations').toArray().length - 1));
    },
  },

}, Map({ undoOperations: List([]) }));

export default unDoReducer;
