/* eslint react/forbid-prop-types: 0 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Filters from './filtersElems';
import { AddForm } from '../../reusableComponents';
import { Tasks } from './tasks';

import styles from './layoutContent.css';

const LayoutContent = (props) => {
  const {
    showDone,
    searchKey,
    match: { url },
    isDisplayed,
  } = props;

  return (
    <div className={isDisplayed ? styles.layoutContent : styles.none}>
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
  isDisplayed: PropTypes.bool.isRequired,
};

export default memo(LayoutContent);
