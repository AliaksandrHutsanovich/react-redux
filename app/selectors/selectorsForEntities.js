export const getEntity = (path, pathParam, titlePrimary) => ({ actionReducers }) => ({
  ...actionReducers.getIn([...path, pathParam]).toObject(),
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
) => ({ actionReducers }) => {
  let entity = actionReducers
    .getIn([...oldPath, oldPathParam])
    .toObject();

  if (newPath) {
    entity = {
      ...entity,
      newPath: oldPath,
      newPathParam: oldPathParam,
      oldPath: newPath,
      oldPathParam: newPathParam || actionReducers.getIn(newPath).toArray().length,
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
    titlePrimary: newTitle,
    descriptionPrimary: newDescription,
    isFinishedValuePrimary: newIsFinishedValue,
    locationPrimary: location,
  };
};
