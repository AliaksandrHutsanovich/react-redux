import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './categoryItem.css';

const CategoryItem = ({ title }) => (
  <p className={styles.itemText}>{title}</p>
);

CategoryItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(CategoryItem);
