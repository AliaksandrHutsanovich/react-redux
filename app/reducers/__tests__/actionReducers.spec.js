import configureStore from 'redux-mock-store';
import * as actions from '../../actions/actions';
import initialState from '../states/initialState';
import actionReducers from '../actionReducers';

const mockStore = configureStore();
const store = mockStore(initialState);

describe('select_actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('addCategory', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'ADD_CATEGORY',
          payload: { title: 'new category' },
        },
      ];
      store.dispatch(actions.addCategory({ title: 'new category' }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = actionReducers(
        undefined,
        {
          type: 'ADD_CATEGORY',
          payload: { title: 'new category' },
        },
      );
      expect(
        newState.getIn([
          'categories',
          newState.get('categories').size - 1,
          'title',
        ]),
      ).toEqual('new category');
    });
  });

  describe('addSubCategory', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'ADD_SUBCATEGORY',
          payload: {
            path: ['categories', 0, 'subCategories'],
            title: 'new subcategory',
          },
        },
      ];
      store.dispatch(actions.addSubCategory({
        title: 'new subcategory',
        path: ['categories', 0, 'subCategories'],
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = actionReducers(
        undefined,
        {
          type: 'ADD_SUBCATEGORY',
          payload: {
            path: ['categories', 0, 'subCategories'],
            title: 'new subcategory',
          },
        },
      );
      expect(
        newState.getIn([
          'categories',
          0,
          'subCategories',
          newState.getIn(['categories', 0, 'subCategories']).size - 1,
          'title',
        ]),
      ).toEqual('new subcategory');
    });
  });

  describe('deleteCategory', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'DELETE_CATEGORY',
          payload: {
            path: ['categories'],
            pathParam: 0,
          },
        },
      ];
      store.dispatch(actions.deleteCategory({
        path: ['categories'],
        pathParam: 0,
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const { length } = store.getState().categories;
      const newState = actionReducers(
        undefined,
        {
          type: 'DELETE_CATEGORY',
          payload: {
            path: ['categories'],
            pathParam: 0,
          },
        },
      );
      expect(length - newState.get('categories').size).toEqual(1);
    });
  });

  describe('editCategory', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'EDIT_CATEGORY',
          payload: {
            path: ['categories'],
            pathParam: 0,
            title: 'category is edit',
          },
        },
      ];
      store.dispatch(actions.editCategory({
        path: ['categories'],
        pathParam: 0,
        title: 'category is edit',
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = actionReducers(
        undefined,
        {
          type: 'EDIT_CATEGORY',
          payload: {
            path: ['categories'],
            pathParam: 0,
            title: 'category is edit',
          },
        },
      );
      expect(newState.getIn(['categories', 0, 'title'])).toEqual('category is edit');
    });
  });

  describe('editTaskStatus', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'EDIT_TASK_STATUS',
          payload: {
            path: ['categories', 0, 'tasks'],
            pathParam: 0,
            value: false,
          },
        },
      ];
      store.dispatch(actions.editTaskStatus({
        path: ['categories', 0, 'tasks'],
        pathParam: 0,
        value: false,
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = actionReducers(
        undefined,
        {
          type: 'EDIT_TASK_STATUS',
          payload: {
            path: ['categories', 0, 'tasks'],
            pathParam: 0,
            value: false,
          },
        },
      );
      expect(newState.getIn(['categories', 0, 'tasks', 0, 'isFinished'])).toEqual(false);
    });
  });

  describe('addTask', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'ADD_TASK',
          payload: {
            path: ['categories', 0, 'tasks'],
            title: 'New task',
          },
        },
      ];
      store.dispatch(actions.addTask({
        path: ['categories', 0, 'tasks'],
        title: 'New task',
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const { length } = store.getState().categories[0].tasks;
      const newState = actionReducers(
        undefined,
        {
          type: 'ADD_TASK',
          payload: {
            path: ['categories', 0, 'tasks'],
            title: 'New task',
          },
        },
      );
      expect(newState.getIn(['categories', 0, 'tasks']).size - length).toEqual(1);
    });
  });

  describe('editTask', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'EDIT_TASK',
          payload: {
            newPath: ['categories', 1, 'tasks'],
            newPathParam: '',
            oldPath: ['categories', 0, 'tasks'],
            oldPathParam: 0,
            title: 'New task title',
            description: 'This task was moved',
            isFinished: false,
          },
        },
      ];
      store.dispatch(actions.editTask({
        newPath: ['categories', 1, 'tasks'],
        newPathParam: '',
        oldPath: ['categories', 0, 'tasks'],
        oldPathParam: 0,
        title: 'New task title',
        description: 'This task was moved',
        isFinished: false,
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const { length } = initialState.categories[1].tasks;
      const newState = actionReducers(
        undefined,
        {
          type: 'EDIT_TASK',
          payload: {
            newPath: ['categories', 1, 'tasks'],
            newPathParam: '',
            oldPath: ['categories', 0, 'tasks'],
            oldPathParam: 0,
            title: 'New task title',
            description: 'This task was moved',
            isFinished: false,
          },
        },
      );
      expect(newState.getIn(['categories', 1, 'tasks']).size - length).toEqual(1);
      expect(newState.getIn(['categories', 0, 'tasks']).size - length).toEqual(-1);
      const task = newState.getIn([
        'categories',
        1,
        'tasks',
        newState.getIn(['categories', 1, 'tasks']).size - 1,
      ]);
      expect(task.get('title')).toEqual('New task title');
      expect(task.get('Description')).toEqual('This task was moved');
      expect(task.get('isFinished')).toEqual(false);
    });

    test('For increasing caverage', () => {
      actionReducers(
        undefined,
        {
          type: 'EDIT_TASK',
          payload: {
            newPath: ['categories', 1, 'tasks'],
            newPathParam: 1,
            title: 'New task title',
            description: 'This task was moved',
            isFinished: false,
          },
        },
      );

      actionReducers(
        undefined,
        {
          type: 'EDIT_TASK',
          payload: {
            oldPath: ['categories', 0, 'tasks'],
            oldPathParam: 0,
            title: 'New task title',
            description: 'This task was moved',
            isFinished: false,
          },
        },
      );
    });
  });

  describe('deleteTask', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'DELETE_TASK',
          payload: {
            path: ['categories', 0, 'tasks'],
            pathParam: 0,
          },
        },
      ];
      store.dispatch(actions.deleteTask({
        path: ['categories', 0, 'tasks'],
        pathParam: 0,
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const { length } = initialState.categories[0].tasks;
      const newState = actionReducers(
        undefined,
        {
          type: 'DELETE_TASK',
          payload: {
            path: ['categories', 0, 'tasks'],
            pathParam: 0,
          },
        },
      );
      expect(newState.getIn(['categories', 0, 'tasks']).size - length).toEqual(-1);
    });
  });

  describe('insertCategory', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'INSERT_CATEGORY',
          payload: {
            path: ['categories'],
            pathParam: 1,
            title: 'New category title',
            subCategories: [],
            tasks: [],
          },
        },
      ];
      store.dispatch(actions.insertCategory({
        path: ['categories'],
        pathParam: 1,
        title: 'New category title',
        subCategories: [],
        tasks: [],
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const { length } = initialState.categories;
      const newState = actionReducers(
        undefined,
        {
          type: 'INSERT_CATEGORY',
          payload: {
            path: ['categories'],
            pathParam: 1,
            title: 'New category title',
            subCategories: [],
            tasks: [],
          },
        },
      );
      expect(newState.get('categories').size - length).toEqual(1);
      expect(newState.getIn(['categories', 1, 'title'])).toEqual('New category title');
    });
  });

  describe('insertTask', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'INSERT_TASK',
          payload: {
            path: ['categories', 0, 'tasks'],
            pathParam: 1,
            title: 'New task title',
            Description: 'This task is very important',
            isFinished: false,
          },
        },
      ];
      store.dispatch(actions.insertTask({
        path: ['categories', 0, 'tasks'],
        pathParam: 1,
        title: 'New task title',
        Description: 'This task is very important',
        isFinished: false,
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const { length } = initialState.categories[0].tasks;
      const newState = actionReducers(
        undefined,
        {
          type: 'INSERT_TASK',
          payload: {
            path: ['categories', 0, 'tasks'],
            pathParam: 1,
            title: 'New task title',
            Description: 'This task is very important',
            isFinished: false,
          },
        },
      );
      expect(newState.getIn(['categories', 0, 'tasks']).size - length).toEqual(1);
      expect(newState.getIn(['categories', 0, 'tasks', 1, 'title'])).toEqual('New task title');
    });
  });

  describe('editCategoryRevive', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'EDIT_CATEGORY_REVIVE',
          payload: {
            path: ['categories'],
            pathParam: 0,
            title: 'Previous category title',
          },
        },
      ];
      store.dispatch(actions.editCategoryRevive({
        path: ['categories'],
        pathParam: 0,
        title: 'Previous category title',
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const newState = actionReducers(
        undefined,
        {
          type: 'EDIT_CATEGORY_REVIVE',
          payload: {
            path: ['categories'],
            pathParam: 0,
            titlePrimary: 'Previous category title',
          },
        },
      );
      expect(newState.getIn(['categories', 0, 'title'])).toEqual('Previous category title');
    });
  });

  describe('editTaskRevive', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'EDIT_TASK_REVIVE',
          payload: {
            newPath: ['categories', 0, 'tasks'],
            newPathParam: 0,
            oldPath: ['categories', 1, 'tasks'],
            oldPathParam: 0,
            titlePrimary: 'Primary title of task',
            descriptionPrimary: 'Primary description',
            isFinishedValuePrimary: true,
          },
        },
      ];
      store.dispatch(actions.editTaskRevive({
        newPath: ['categories', 0, 'tasks'],
        newPathParam: 0,
        oldPath: ['categories', 1, 'tasks'],
        oldPathParam: 0,
        titlePrimary: 'Primary title of task',
        descriptionPrimary: 'Primary description',
        isFinishedValuePrimary: true,
      }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Reducer returns right state', () => {
      const { length: oldTaskslength } = initialState.categories[1].tasks;
      const { length: newTaskslength } = initialState.categories[0].tasks;
      const newState = actionReducers(
        undefined,
        {
          type: 'EDIT_TASK_REVIVE',
          payload: {
            newPath: ['categories', 0, 'tasks'],
            newPathParam: 1,
            oldPath: ['categories', 1, 'tasks'],
            oldPathParam: 0,
            titlePrimary: 'Primary title of task',
            descriptionPrimary: 'Primary description',
            isFinishedValuePrimary: true,
          },
        },
      );
      expect(newState.getIn(['categories', 1, 'tasks']).size - oldTaskslength).toEqual(1);
      expect(newState.getIn(['categories', 0, 'tasks']).size - newTaskslength).toEqual(-1);
      expect(newState.getIn(['categories', 1, 'tasks', 0, 'title'])).toEqual('Primary title of task');
    });

    test('For increasing coverage', () => {
      actionReducers(
        undefined,
        {
          type: 'EDIT_TASK_REVIVE',
          payload: {
            oldPath: ['categories', 1, 'tasks'],
            oldPathParam: 0,
            titlePrimary: 'Primary title of task',
            descriptionPrimary: 'Primary description',
            isFinishedValuePrimary: true,
          },
        },
      );
    });
  });
});
