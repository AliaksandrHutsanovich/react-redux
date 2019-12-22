import {
  incrementInDone,
  decrementInDone,
} from '../../../../actions';

const changeInDone = (
  isFinishedTask,
  dispatch,
) => (isFinishedTask ? dispatch(incrementInDone()) : dispatch(decrementInDone()));

const getStateValue = (isFinishedTask, isStatusChanged, dispatch) => {
  if (isStatusChanged) {
    changeInDone(isFinishedTask, dispatch);
  }
  return isFinishedTask;
};

export const getOldPathParams = (oldPath) => ({
  oldPath: oldPath.filter((x, index, path) => index < path.length - 1),
  oldPathParam: oldPath[oldPath.length - 1],
});

export default getStateValue;
