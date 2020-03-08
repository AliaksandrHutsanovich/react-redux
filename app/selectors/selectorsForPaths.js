export const getCategoryPath = ({ actionReducers }) => 'categories-' + (actionReducers.get('categories').toArray().length - 1);

export const getSubCategoryPath = (path) => ({ actionReducers }) => actionReducers
  .getIn(path).toArray().length - 1;

export const getTaskPath = (path) => ({ actionReducers }) => actionReducers
  .getIn(path).toArray().length - 1;
