import configureStore from 'redux-mock-store';
import * as actions from '../../actions';
import unDoReducer from '../unDoReducer';

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

  describe('addToUnDo', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'ADD_TO_UNDO',
          payload: payloadObj,
        },
      ];
      store.dispatch(actions.addToUnDo(payloadObj));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = unDoReducer(
        undefined,
        {
          type: 'ADD_TO_UNDO',
          payload: payloadObj,
        },
      );
      expect(newState.get('undoOperations').size).toEqual(1);
    });
  });

  describe('deleteFromUnDo', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'DELETE_FROM_UNDO',
        },
      ];
      store.dispatch(actions.deleteFromUnDo());
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const prevPrevState = unDoReducer(
        undefined,
        {
          type: 'ADD_TO_UNDO',
          payload: payloadObj,
        },
      );
      const prevState = unDoReducer(
        prevPrevState,
        {
          type: 'ADD_TO_UNDO',
          payload: payloadObj,
        },
      );
      const newState = unDoReducer(
        prevState,
        {
          type: 'DELETE_FROM_UNDO',
        },
      );

      expect(newState.get('undoOperations').size).toEqual(1);
    });
  });
});
