import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { switchContentDisplay } from '../actions';

const contentDisplay = handleActions({
  [switchContentDisplay]: {
    next(state, { payload: { isDisplayed, url } }) {
      if (!url) {
        return state
          .set('isDisplayed', isDisplayed);
      }
      if (isDisplayed === undefined && url) {
        return state.set('url', url);
      }
      return state
        .set('isDisplayed', isDisplayed)
        .set('url', url);
    },
  },
}, Map({ isDisplayed: true, url: '' }));

export default contentDisplay;
