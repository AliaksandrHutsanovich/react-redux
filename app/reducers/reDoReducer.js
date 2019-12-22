import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { addToReDo, deleteFromReDo, clearReDo } from '../actions';

const reDoReducer = handleActions({

  [addToReDo]: {
    next(state, { payload }) {
      return state
        .update('redoOperations', (operations) => operations.push(Map(payload)));
    },
  },

  [deleteFromReDo]: {
    next(state) {
      return state.update('redoOperations', (operations) => operations.delete(state.get('redoOperations').toArray().length - 1));
    },
  },

  [clearReDo]: {
    next(state) {
      return state.set('redoOperations', List([]));
    },
  },

}, Map({ redoOperations: List([]) }));

export default reDoReducer;
