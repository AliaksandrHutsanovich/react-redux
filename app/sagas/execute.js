import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const execute = (saga, ...args) => sagaMiddleware.run(saga, ...args).done;
export default execute;
