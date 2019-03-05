import {
    addCategory,
    addSubCategory,
    deleteCategory,
    editCategory,
    editTaskStatus,
    addTask,
    editTask,
    deleteTask,
    insertCategory,
    insertTask,
    editCategoryRevive,
    editTaskRevive
} from '../actions/actions';
import { handleActions } from 'redux-actions';
import immutable from 'immutable';
const Map = immutable.Map,
    List = immutable.List;
import { initialState } from './states/initialState';

export const actionReducers = handleActions({

    [addCategory]: {
        next(state, { payload }) {
            return state
                .update("categories",
                (categories) => categories.push(Map({ title: payload.title, subCategories: List([]), tasks: List([]) })));
        }
    },

    [addSubCategory]: {
        next(state, { payload }) {
            return state
                .updateIn(payload.path,
                subCategories => subCategories.push(Map({ title: payload.title, subCategories: List([]), tasks: List([]) })));
        }
    },

    [deleteCategory]: {
        next(state, { payload }) {
            let fullPath = Object.assign([], payload.path);
            fullPath.push(payload.pathParam);
            return state.deleteIn(fullPath);
        }
    },

    [editCategory]: {
        next(state, { payload }) {
            let fullPath = Object.assign([], payload.path);
            fullPath.push(payload.pathParam);
            return state
                .updateIn(fullPath,
                category => {
                    return category.set("title", payload.title);
                });
        }
    },

    [editTaskStatus]: {
        next(state, { payload }) {
            let fullPath = Object.assign([], payload.path);
            fullPath.push(payload.pathParam);
            return state
                .updateIn(fullPath,
                task => {
                    return task.set("isFinished", payload.value);
                });
        }
    },

    [addTask]: {
        next(state, { payload }) {
            return state
                .updateIn(payload.path,
                tasks => tasks.push(Map({ title: payload.title, Description: "", isFinished: false })));
        }
    },

    [editTask]: {
        next(state, { payload }) {
            if (payload.newPath) {
                if (payload.newPathParam) {
                    state = state
                        .updateIn(payload.newPath,
                        tasks => tasks.insert(payload.newPathParam, Map({ title: payload.title, Description: payload.description, isFinished: payload.isFinished })));
                }
                else {
                    state = state
                        .updateIn(payload.newPath,
                        tasks => tasks.push(Map({ title: payload.title, Description: payload.description, isFinished: payload.isFinished })));
                }
                if (payload.oldPath) {
                    let fullOldPath = Object.assign([], payload.oldPath);
                    fullOldPath.push(payload.oldPathParam);
                    return state.deleteIn(fullOldPath);
                }
                else {
                    return state;
                }
            }
            else {
                let fullOldPath = Object.assign([], payload.oldPath);
                fullOldPath.push(payload.oldPathParam);
                return state
                    .updateIn(fullOldPath,
                    task => task.set('title', payload.title).set('Description', payload.description).set('isFinished', payload.isFinished));
            }
        }
    },

    [deleteTask]: {
        next(state, { payload }) {
            let fullPath = Object.assign([], payload.path);
            fullPath.push(payload.pathParam);
            return state.deleteIn(fullPath);
        }
    },

    [insertCategory]: {
        next(state, { payload }) {
            return state.updateIn(payload.path, categories => categories.insert(payload.pathParam, Map({ title: payload.title, subCategories: payload.subCategories, tasks: payload.tasks })));
        }
    },

    [insertTask]: {
        next(state, { payload }) {
            return state.updateIn(payload.path, tasks => tasks.insert(payload.pathParam, Map({ title: payload.title, Description: payload.description, isFinished: payload.isFinished })));
        }
    },

    [editCategoryRevive]: {
        next(state, { payload }) {
            let fullPath = Object.assign([], payload.path);
            fullPath.push(payload.pathParam);
            return state
                .updateIn(fullPath,
                category => {
                    return category.set("title", payload.titlePrimary);
                });
        }
    },

    [editTaskRevive]: {
        next(state, { payload }) {
            if (payload.newPath) {
                let fullNewPath = Object.assign([], payload.newPath);
                fullNewPath.push(payload.newPathParam);

                return state
                    .updateIn(payload.oldPath,
                    tasks => tasks.insert(payload.oldPathParam, Map({ title: payload.titlePrimary, Description: payload.descriptionPrimary, isFinished: payload.isFinishedValuePrimary })))
                    .deleteIn(fullNewPath);
            }
            else {
                let fullOldPath = Object.assign([], payload.oldPath);
                fullOldPath.push(payload.oldPathParam);
                return state.updateIn(fullOldPath, task => task.set('title', payload.titlePrimary).set('Description', payload.descriptionPrimary).set('isFinished', payload.isFinishedValuePrimary));
            }
        }
    }

}, Map().merge(initialState));