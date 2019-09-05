import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CategoryItem = ({ title }) => (
  <p className="item-text">{title}</p>
);

CategoryItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(CategoryItem);
