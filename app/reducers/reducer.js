import { combineReducers } from 'redux';
import {actionReducers} from './actionReducers'; 
import {filters} from  './filters';
import { countPerсent } from './countPercent';
import { reDoReducer } from './reDoReducer';
import { unDoReducer } from './unDoReducer';

export default combineReducers({
    actionReducers,
    filters,
    countPerсent,
    reDoReducer,
    unDoReducer
});








