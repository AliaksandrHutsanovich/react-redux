import configureStore from 'redux-mock-store';
import * as actions from '../../actions';
import contentDisplay from '../switchContentDisplay';

const mockStore = configureStore();
const store = mockStore({});

const payloadObj = {
  isDisplayed: false,
  url: '/categories-0',
};

describe('select_actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('Dispatches the correct action and payload', () => {
    const expectedActions = [
      {
        type: 'SWITCH_DISPLAY',
        payload: payloadObj,
      },
    ];
    store.dispatch(actions.switchContentDisplay(payloadObj));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Reducer returns right state', () => {
    const newState = contentDisplay(
      undefined,
      {
        type: 'SWITCH_DISPLAY',
        payload: payloadObj,
      },
    );
    expect(newState.get('isDisplayed')).toBeFalsy();
    expect(newState.get('url')).toEqual('/categories-0');
  });

  test('Reducer returns right state when no url', () => {
    const newState = contentDisplay(
      undefined,
      {
        type: 'SWITCH_DISPLAY',
        payload: { isDisplayed: true },
      },
    );
    expect(newState.get('isDisplayed')).toBeTruthy();
    expect(newState.get('url')).toEqual('');
  });

  test('Reducer returns right state when isDisplayed undefine', () => {
    const newState = contentDisplay(
      undefined,
      {
        type: 'SWITCH_DISPLAY',
        payload: { url: '/categories-0' },
      },
    );
    expect(newState.get('isDisplayed')).toBeTruthy();
    expect(newState.get('url')).toEqual('/categories-0');
  });
});
