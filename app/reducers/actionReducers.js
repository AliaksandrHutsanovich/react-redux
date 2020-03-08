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
    next(state, { payload: { title } }) {
      return state
        .update(
          'categories',
          (categories) => categories.push(
            Map({
              title,
              subCategories: List([]),
              tasks: List([]),
            }),
          ),
        );
    },
  },

  [addSubCategory]: {
    next(state, { payload: { path, title } }) {
      return state
        .updateIn(
          path,
          (subCategories) => subCategories.push(
            Map({
              title,
              subCategories: List([]),
              tasks: List([]),
            }),
          ),
        );
    },
  },

  [deleteCategory]: {
    next(state, { payload: { path, pathParam } }) {
      return state.deleteIn([...path, pathParam]);
    },
  },

  [editCategory]: {
    next(state, { payload: { path, pathParam, title } }) {
      return state
        .updateIn(
          [...path, pathParam],
          (category) => category.set('title', title),
        );
    },
  },

  [editTaskStatus]: {
    next(state, { payload: { path, pathParam, value } }) {
      return state
        .updateIn(
          [...path, pathParam],
          (task) => task.set('isFinished', value),
        );
    },
  },

  [addTask]: {
    next(state, { payload: { path, title } }) {
      return state
        .updateIn(
          path,
          (tasks) => tasks.push(
            Map({
              title,
              description: '',
              isFinished: false,
              location: Map({}),
            }),
          ),
        );
    },
  },

  [editTask]: {
    next(state, {
      payload: {
        newPath,
        newPathParam,
        title,
        description,
        isFinished,
        oldPath,
        oldPathParam,
        location,
      },
    }) {
      if (newPath) {
        let newState;
        if (newPathParam) {
          newState = state
            .updateIn(
              newPath,
              (tasks) => tasks.insert(
                newPathParam,
                Map({
                  title,
                  description,
                  isFinished,
                  location: Map(location),
                }),
              ),
            );
        } else {
          newState = state
            .updateIn(
              newPath,
              (tasks) => tasks.push(
                Map({
                  title,
                  description,
                  isFinished,
                  location: Map(location),
                }),
              ),
            );
        }
        if (oldPath) {
          return newState.deleteIn([...oldPath, oldPathParam]);
        }
        return newState;
      }
      return state
        .updateIn(
          [...oldPath, oldPathParam],
          (task) => task
            .set('title', title)
            .set('description', description)
            .set('isFinished', isFinished)
            .set('location', Map(location)),
        );
    },
  },

  [deleteTask]: {
    next(state, { payload: { path, pathParam } }) {
      return state.deleteIn([...path, pathParam]);
    },
  },

  [insertCategory]: {
    next(state, {
      payload: {
        path,
        pathParam,
        title,
        subCategories,
        tasks,
      },
    }) {
      return state
        .updateIn(
          path,
          (categories) => categories
            .insert(
              pathParam,
              Map({
                title,
                subCategories,
                tasks,
              }),
            ),
        );
    },
  },

  [insertTask]: {
    next(state, {
      payload: {
        path,
        pathParam,
        title,
        description,
        isFinished,
        location,
      },
    }) {
      return state
        .updateIn(
          path,
          (tasks) => tasks
            .insert(
              pathParam,
              Map({
                title,
                description,
                isFinished,
                location,
              }),
            ),
        );
    },
  },

  [editCategoryRevive]: {
    next(state, {
      payload: {
        path,
        pathParam,
        titlePrimary,
      },
    }) {
      return state
        .updateIn(
          [...path, pathParam],
          (category) => category
            .set('title', titlePrimary),
        );
    },
  },

  [editTaskRevive]: {
    next(state, {
      payload: {
        newPath,
        newPathParam,
        oldPath,
        oldPathParam,
        titlePrimary,
        descriptionPrimary,
        isFinishedValuePrimary,
        locationPrimary,
      },
    }) {
      if (newPath) {
        return state
          .updateIn(
            oldPath,
            (tasks) => tasks
              .insert(
                oldPathParam,
                Map({
                  title: titlePrimary,
                  description: descriptionPrimary,
                  isFinished: isFinishedValuePrimary,
                  location: Map(locationPrimary),
                }),
              ),
          )
          .deleteIn([...newPath, newPathParam]);
      }
      return state
        .updateIn(
          [...oldPath, oldPathParam],
          (task) => task
            .set('title', titlePrimary)
            .set('description', descriptionPrimary)
            .set('isFinished', isFinishedValuePrimary)
            .set('location', Map(locationPrimary)),
        );
    },
  },
}, Map().merge(initialState));

export default actionReducers;
