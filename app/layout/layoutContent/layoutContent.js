/* eslint react/forbid-prop-types: 0 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Filters from './filtersElems';
import { AddForm } from '../../reusableComponents';
import { Tasks } from './tasks';

const LayoutContent = (props) => {
  const {
    showDone,
    searchKey,
    match: { url },
  } = props;
  return (
    <div>
      <AddForm url={url} placeholder="Add new task" />
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
