import { createAction } from 'redux-actions';

export const startAddCategoryProcess = createAction('START_ADD_CATEGORY_PROCESS');
export const startAddSubCategoryProcess = createAction('START_ADD_SUB_CATEGORY_PROCESS');
export const startDeleteCategoryProcess = createAction('START_DELETE_CATEGORY_PROCESS');
export const startEditCategoryProcess = createAction('START_EDIT_CATEGORY_PROCESS');
export const startEditTaskStatusProcess = createAction('START_EDIT_TASK_STATUS_PROCESS');
export const startAddTaskProcess = createAction('START_ADD_TASK_PROCESS');
export const startDeleteTaskProcess = createAction('START_DELETE_TASK_PROCESS');
export const startEditTaskProcess = createAction('START_EDIT_TASK_PROCESS');

export const addCategory = createAction('ADD_CATEGORY');
export const addSubCategory = createAction('ADD_SUBCATEGORY');
export const deleteCategory = createAction('DELETE_CATEGORY');
export const editCategory = createAction('EDIT_CATEGORY');

export const editCategoryRevive = createAction('EDIT_CATEGORY_REVIVE');

export const insertCategory = createAction('INSERT_CATEGORY');

export const addTask = createAction('ADD_TASK');
export const editTaskStatus = createAction('EDIT_TASK_STATUS');
export const editTask = createAction('EDIT_TASK');
export const deleteTask = createAction('DELETE_TASK');

export const editTaskRevive = createAction('EDIT_TASK_REVIVE');

export const insertTask = createAction('INSERT_TASK');

export const showDoneTasks = createAction('SHOW_DONE');
export const searchTasks = createAction('SEARCH_TASK');

export const countPercentage = createAction('COUNT_PERCENTAGE');
export const incrementInDone = createAction('INCREMENT');
export const decrementInDone = createAction('DECREMENT');
export const incrementInAll = createAction('INCREMENT_ALL');
export const decrementInAll = createAction('DECREMENT_ALL');

export const startUnDoProcess = createAction('START_UNDO_PROCESS');
export const startReDoProcess = createAction('START_REDO_PROCESS');

export const addToUnDo = createAction('ADD_TO_UNDO');
export const deleteFromUnDo = createAction('DELETE_FROM_UNDO');

export const addToReDo = createAction('ADD_TO_REDO');
export const deleteFromReDo = createAction('DELETE_FROM_REDO');

export const clearReDo = createAction('CLEAR_REDO');
