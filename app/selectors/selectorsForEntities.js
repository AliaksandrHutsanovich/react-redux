export const getEntity = (path, pathParam, titlePrimary) => (state) => ({
  ...state.actionReducers.getIn([...path, pathParam]).toObject(),
  path,
  pathParam,
  titlePrimary,
});

export const getEntityByPath = (
  oldPath,
  newPath,
  newTitle,
  newDescription,
  newIsFinishedValue,
  location,
  oldPathParam,
  newPathParam,
) => (state) => {
  let entity = state
    .actionReducers
    .getIn([...oldPath, oldPathParam])
    .toObject();

  if (newPath) {
    entity = {
      ...entity,
      newPath: oldPath,
      newPathParam: oldPathParam,
      oldPath: newPath,
      oldPathParam: newPathParam || state.actionReducers.getIn(newPath).toArray().length,
    };
  } else {
    entity = {
      ...entity,
      newPath,
      newPathParam,
      oldPath,
      oldPathParam,
    };
  }
  return {
    ...entity,
    description: entity.Description,
    titlePrimary: newTitle,
    descriptionPrimary: newDescription,
    isFinishedValuePrimary: newIsFinishedValue,
    locationPrimary: location,
  };
};
