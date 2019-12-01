import configureStore from 'redux-mock-store';
import * as actions from '../../actions/actions';
import initialState from '../states/initialState';
import countPerсent from '../countPercent';

const mockStore = configureStore();
const store = mockStore(initialState);

describe('select actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('countPercentage', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'COUNT_PERCENTAGE',
          payload: { done: 5, all: 10 },
        },
      ];
      store.dispatch(actions.countPercentage({ done: 5, all: 10 }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = countPerсent(
        undefined,
        {
          type: 'COUNT_PERCENTAGE',
          payload: { done: 5, all: 10 },
        },
      );
      expect(newState.get('done')).toEqual(5);
      expect(newState.get('all')).toEqual(10);
    });
  });

  describe('incrementInDone', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'INCREMENT',
        },
      ];
      store.dispatch(actions.incrementInDone());
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = countPerсent(
        undefined,
        { type: 'INCREMENT' },
      );
      expect(newState.get('done')).toEqual(1);
    });
  });

  describe('decrementInDone', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'DECREMENT',
        },
      ];
      store.dispatch(actions.decrementInDone());
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = countPerсent(
        undefined,
        { type: 'DECREMENT' },
      );
      expect(newState.get('done')).toEqual(-1);
    });
  });

  describe('incrementInAll', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'INCREMENT_ALL',
        },
      ];
      store.dispatch(actions.incrementInAll());
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = countPerсent(
        undefined,
        { type: 'INCREMENT_ALL' },
      );
      expect(newState.get('all')).toEqual(1);
    });
  });

  describe('decrementInAll', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'DECREMENT_ALL',
        },
      ];
      store.dispatch(actions.decrementInAll());
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = countPerсent(
        undefined,
        { type: 'DECREMENT_ALL' },
      );
      expect(newState.get('all')).toEqual(-1);
    });
  });
});
