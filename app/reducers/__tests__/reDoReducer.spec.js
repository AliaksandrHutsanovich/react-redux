import configureStore from 'redux-mock-store';
import * as actions from '../../actions/actions';
import reDoReducer from '../reDoReducer';

const mockStore = configureStore();
const store = mockStore({});

const payloadObj = {
  undoOperation: actions.deleteCategory,
  redoOperation: actions.addSubCategory,
  obj: {
    path: 'category',
    pathParam: '0',
    title: 'my category',
    subCategories: [],
    tasks: [],
  },
};

describe('select_actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  describe('addToReDo', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'ADD_TO_REDO',
          payload: payloadObj,
        },
      ];
      store.dispatch(actions.addToReDo(payloadObj));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = reDoReducer(
        undefined,
        {
          type: 'ADD_TO_REDO',
          payload: payloadObj,
        },
      );
      expect(newState.get('redoOperations').size).toEqual(1);
    });
  });

  describe('deleteFromReDo', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'DELETE_FROM_REDO',
        },
      ];
      store.dispatch(actions.deleteFromReDo());
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const prevPrevState = reDoReducer(
        undefined,
        {
          type: 'ADD_TO_REDO',
          payload: payloadObj,
        },
      );
      const prevState = reDoReducer(
        prevPrevState,
        {
          type: 'ADD_TO_REDO',
          payload: payloadObj,
        },
      );
      const newState = reDoReducer(
        prevState,
        {
          type: 'DELETE_FROM_REDO',
        },
      );

      expect(newState.get('redoOperations').size).toEqual(1);
    });
  });

  describe('clearReDo', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'CLEAR_REDO',
        },
      ];
      store.dispatch(actions.clearReDo());
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = reDoReducer(
        undefined,
        {
          type: 'CLEAR_REDO',
        },
      );
      expect(newState.get('redoOperations').size).toEqual(0);
    });
  });
});
