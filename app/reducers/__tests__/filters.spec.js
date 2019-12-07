import configureStore from 'redux-mock-store';
import * as actions from '../../actions/actions';
import filters from '../filters';

const mockStore = configureStore();
const store = mockStore({});

describe('select_actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('showDoneTasks', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'SHOW_DONE',
          payload: false,
        },
      ];
      store.dispatch(actions.showDoneTasks(false));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = filters(
        undefined,
        {
          type: 'SHOW_DONE',
          payload: false,
        },
      );
      expect(newState.get('showDone')).toEqual(false);
      expect(newState.get('searchKey')).toEqual('');
    });
  });

  describe('searchTasks', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'SEARCH_TASK',
          payload: 'my task',
        },
      ];
      store.dispatch(actions.searchTasks('my task'));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = filters(
        undefined,
        {
          type: 'SEARCH_TASK',
          payload: 'my task',
        },
      );
      expect(newState.get('showDone')).toEqual(true);
      expect(newState.get('searchKey')).toEqual('my task');
    });
  });
});
