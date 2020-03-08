import { select } from 'redux-saga/effects';
import { isExist } from '../selectors';

function* validate({ payload: { path, title } }) {
  return yield select(isExist(title, path));
}

export default validate;
