/* eslint react/forbid-prop-types: 0 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Filters from './filtersElems/filters';
import AddTask from '../../reusableComponents/addForm/addForm';
import Tasks from './tasks/tasks/tasks';

const LayoutContent = (props) => {
  const {
    showDone,
    searchKey,
    match: { url },
  } = props;
  return (
    <div>
      <AddTask url={url} placeholder="Add new task" />
      <Filters showDone={showDone} searchKey={searchKey} />
      <Tasks {...props} />
    </div>
  );
};

LayoutContent.propTypes = {
  showDone: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default memo(LayoutContent);
