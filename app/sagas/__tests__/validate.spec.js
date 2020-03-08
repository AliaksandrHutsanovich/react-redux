import { select } from 'redux-saga/effects';
import { isExist } from '../../selectors';
import validate from '../validate';

describe('the saga should work step by step', () => {
  const payloadObj = {
    payload: {
      path: '/category',
      title: 'category',
    },
  };
  const gen = validate(payloadObj);
  const res = isExist('category', '/category');
  it('should take selector', () => {
    expect(gen.next().value.SELECT.selector.toString())
      .toEqual(select(res).SELECT.selector.toString());
  });

  it('should wait before the selector has not been taken', () => {
    expect(gen.next().done).toBeTruthy();
  });
});
