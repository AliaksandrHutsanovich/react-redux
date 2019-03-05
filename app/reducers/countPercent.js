import { countPercentage, incrementInDone, decrementInDone, incrementInAll, decrementInAll } from '../actions/actions';
import { handleActions } from 'redux-actions';
import immutable from 'immutable';
const Map = immutable.Map;

export const countPerсent = handleActions({

    [countPercentage]: {
        next(state, { payload }) {
            return state.set('done', payload.done).set('all', payload.all);
        }
    },

    [incrementInDone]: {
        next(state, { payload }) {
            let done = state.get('done') + 1;
            return state.set('done', done);
        }
    },

    [decrementInDone]: {
        next(state, { payload }) {
            let done = state.get('done') - 1;
            return state.set('done', done);
        }
    },

    [incrementInAll]: {
        next(state, { payload }) {
            let all = state.get('all') + 1;
            return state.set('all', all);
        }
    },

    [decrementInAll]: {
        next(state, { payload }) {
            let all = state.get('all') - 1;
            return state.set('all', all);
        }
    }

}, Map({ done: 0, all: 0 }));

