export const getEntity = (path, pathParam, titlePrimary) => state => {
    let fullPath = Object.assign([], path);
    fullPath.push(pathParam);
    let entity = state.actionReducers.getIn(fullPath).toObject();
    entity.path = path;
    entity.pathParam = pathParam;
    if (titlePrimary) {
        entity.titlePrimary = titlePrimary;
    }
    return entity;
}

export const getEntityByPath = (oldPath, newPath, newTitle, newDescription, newIsFinishedValue, oldPathParam, newPathParam) => state => {
    let fullOldPath = Object.assign([], oldPath);
    fullOldPath.push(oldPathParam);
    let entity = state.actionReducers.getIn(fullOldPath).toObject();
    if (newPath) {
        entity.newPath = oldPath;
        entity.newPathParam = oldPathParam;
        entity.oldPath = newPath;
        if (!newPathParam) {
            newPathParam = state.actionReducers.getIn(newPath).toArray().length;
        }
        entity.oldPathParam = newPathParam;
    }
    else {
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
}

