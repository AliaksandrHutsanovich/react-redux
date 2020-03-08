const getEntitiesTitles = ({ actionReducers }, path) => (
  actionReducers
    .getIn(path)
    .map((entity) => entity.get('title'))
    .toArray()
);

const isExist = (title, path) => (state) => getEntitiesTitles(state, path).includes(title);

export default isExist;
