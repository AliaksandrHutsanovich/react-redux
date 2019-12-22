import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
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
  editTaskRevive,
} from '../actions';

import initialState from './states/initialState';

const actionReducers = handleActions({

  [addCategory]: {
    next(state, { payload }) {
      return state
        .update(
          'categories',
          (categories) => categories.push(
            Map({
              title: payload.title,
              subCategories: List([]),
              tasks: List([]),
            }),
          ),
        );
    },
  },

    [addSubCategory]: {
      next(state, { payload }) {
        return state
          .updateIn(
            payload.path,
            (subCategories) => subCategories.push(
              Map({
                title: payload.title,
                subCategories: List([]),
                tasks: List([]),
              }),
            ),
          );
      },
    },

    [deleteCategory]: {
      next(state, { payload }) {
        const fullPath = Object.assign([], payload.path);
        fullPath.push(payload.pathParam);
        return state.deleteIn(fullPath);
      },
    },

    [editCategory]: {
      next(state, { payload }) {
        const fullPath = Object.assign([], payload.path);
        fullPath.push(payload.pathParam);
        return state
          .updateIn(
            fullPath,
            (category) => category.set('title', payload.title),
          );
      },
    },

    [editTaskStatus]: {
      next(state, { payload }) {
        const fullPath = Object.assign([], payload.path);
        fullPath.push(payload.pathParam);
        return state
          .updateIn(
            fullPath,
            (task) => task.set('isFinished', payload.value),
          );
      },
    },

    [addTask]: {
      next(state, { payload }) {
        return state
          .updateIn(
            payload.path,
            (tasks) => tasks.push(
              Map({
                title: payload.title,
                Description: '',
                isFinished: false,
              }),
            ),
          );
      },
    },

    [editTask]: {
      next(state, { payload }) {
        if (payload.newPath) {
          let newState;
          if (payload.newPathParam) {
            newState = state
              .updateIn(
                payload.newPath,
                (tasks) => tasks.insert(
                  payload.newPathParam,
                  Map({
                    title: payload.title,
                    Description: payload.description,
                    isFinished: payload.isFinished,
                  }),
                ),
              );
            } else {
              newState = state
                .updateIn(
                  payload.newPath,
                  (tasks) => tasks.push(
                    Map({
                      title: payload.title,
                      Description: payload.description,
                      isFinished: payload.isFinished,
                    }),
                  ),
                );
            }
            if (payload.oldPath) {
              const fullOldPath = Object.assign([], payload.oldPath);
              fullOldPath.push(payload.oldPathParam);
              return newState.deleteIn(fullOldPath);
            }
            return newState;
        }
        const fullOldPath = Object.assign([], payload.oldPath);
        fullOldPath.push(payload.oldPathParam);
        return state
          .updateIn(
            fullOldPath,
            (task) => task
              .set('title', payload.title)
              .set('Description', payload.description)
              .set('isFinished', payload.isFinished),
          );
        },
    },

    [deleteTask]: {
      next(state, { payload }) {
        const fullPath = Object.assign([], payload.path);
        fullPath.push(payload.pathParam);
        return state.deleteIn(fullPath);
      },
    },

    [insertCategory]: {
      next(state, { payload }) {
        return state
          .updateIn(
            payload.path,
            (categories) => categories
              .insert(
                payload.pathParam,
                Map({
                  title: payload.title,
                  subCategories: payload.subCategories,
                  tasks: payload.tasks,
                }),
              ),
          );
      },
    },

    [insertTask]: {
      next(state, { payload }) {
        return state
          .updateIn(
            payload.path,
            (tasks) => tasks
              .insert(
                payload.pathParam,
                Map({
                  title: payload.title,
                  Description: payload.description,
                  isFinished: payload.isFinished,
                }),
              ),
          );
      },
    },

    [editCategoryRevive]: {
      next(state, { payload }) {
        const fullPath = Object.assign([], payload.path);
        fullPath.push(payload.pathParam);
        return state
          .updateIn(
            fullPath,
            (category) => category
              .set('title', payload.titlePrimary),
          );
      },
    },

    [editTaskRevive]: {
      next(state, { payload }) {
        if (payload.newPath) {
          const fullNewPath = Object.assign([], payload.newPath);
          fullNewPath.push(payload.newPathParam);
          return state
            .updateIn(
              payload.oldPath,
              (tasks) => tasks
                .insert(
                  payload.oldPathParam,
                  Map({
                    title: payload.titlePrimary,
                    Description: payload.descriptionPrimary,
                    isFinished: payload.isFinishedValuePrimary,
                  }),
                ),
            )
            .deleteIn(fullNewPath);
        }
        const fullOldPath = Object.assign([], payload.oldPath);
        fullOldPath.push(payload.oldPathParam);
        return state
          .updateIn(
            fullOldPath,
            (task) => task
              .set('title', payload.titlePrimary)
              .set('Description', payload.descriptionPrimary)
              .set('isFinished', payload.isFinishedValuePrimary),
          );
      },
    },
}, Map().merge(initialState));

export default actionReducers;
