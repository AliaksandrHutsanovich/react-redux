import execute from '../execute';

jest.mock('redux-saga', () => () => ({
  run: (saga) => {
    const res = saga();
    return res.next();
  },
}));

describe('test function', () => {
  const testFn = jest.fn();
  function* testSaga() {
    yield testFn();
  }

  it('function in saga should be called', () => {
    execute(testSaga);
    expect(testFn).toHaveBeenCalled();
  });
});
