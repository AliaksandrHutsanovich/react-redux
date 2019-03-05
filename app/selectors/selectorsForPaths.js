export const getCategoryPath = state => 'categories-' + (state.actionReducers.get("categories").toArray().length - 1);

export const getSubCategoryPath = path => state => (state.actionReducers.getIn(path).toArray().length - 1); 

export const getTaskPath = path => state => (state.actionReducers.getIn(path).toArray().length - 1);