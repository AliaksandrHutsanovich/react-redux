export const getEntity = (path, pathParam, titlePrimary) => (state) => {
  const fullPath = Object.assign([], path);
  fullPath.push(pathParam);
  const entity = state.actionReducers.getIn(fullPath).toObject();
  entity.path = path;
  entity.pathParam = pathParam;
  if (titlePrimary) {
    entity.titlePrimary = titlePrimary;
  }
  return entity;
};

export const getEntityByPath = (
  oldPath,
  newPath,
  newTitle,
  newDescription,
  newIsFinishedValue,
  oldPathParam,
  newPathParam,
) => (state) => {
  const fullOldPath = Object.assign([], oldPath);
  fullOldPath.push(oldPathParam);
  const entity = state.actionReducers.getIn(fullOldPath).toObject();
  if (newPath) {
    entity.newPath = oldPath;
    entity.newPathParam = oldPathParam;
    entity.oldPath = newPath;
    let newPathParamVar = newPathParam;
    if (!newPathParamVar) {
      newPathParamVar = state.actionReducers.getIn(newPath).toArray().length;
    }
    entity.oldPathParam = newPathParamVar;
  } else {
    entity.newPath = newPath;
    entity.newPathParam = newPathParam;
    entity.oldPath = oldPath;
    entity.oldPathParam = oldPathParam;
  }
  entity.description = entity.Description;
  if (newTitle) {
    entity.titlePrimary = newTitle;
  }
  if (newDescription) {
    entity.descriptionPrimary = newDescription;
  }
  if (newIsFinishedValue) {
    entity.isFinishedValuePrimary = newIsFinishedValue;
  }
  return entity;
};
