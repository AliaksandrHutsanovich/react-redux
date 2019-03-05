import { 
    showDoneTasks,
    searchTasks
} from '../actions/actions';
import { handleActions } from 'redux-actions';
import immutable from 'immutable';
const Map = immutable.Map,
      List = immutable.List;

export const filters = handleActions({

    [showDoneTasks]: {
        next(state, {payload}) {
            return state.set("showDone", payload);
        }
    },

    [searchTasks]: {
        next(state, {payload}) {
            return state.set("searchKey", payload);
        }
    }

}, Map({ showDone: true, searchKey: '' }));