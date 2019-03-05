import { addToReDo, deleteFromReDo, clearReDo } from '../actions/actions';
import { handleActions } from 'redux-actions';
import immutable from 'immutable';
const Map = immutable.Map,
      List = immutable.List;

export const reDoReducer = handleActions({

    [addToReDo]: {
        next(state, { payload }) {
            return state.update('redoOperations', operations => operations.push(Map(payload)));
        }
    },

    [deleteFromReDo]: {
        next(state, { payload }) {
            return state.update('redoOperations', operations => operations.delete(state.get('redoOperations').toArray().length - 1));
        }
    },

    [ clearReDo ]: {
        next(state, { payload }) {
            return state.set('redoOperations', List([]));
        }
    }

}, Map({ redoOperations: List([]) }));
