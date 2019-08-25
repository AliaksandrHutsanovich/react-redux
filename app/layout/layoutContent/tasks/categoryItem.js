import React from 'react';
import PropTypes from 'prop-types';

class CategoryItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { title } = this.props;
    return (nextProps.title !== title);
  }

  render() {
    const { title } = this.props;
    return (
      <p className="item-text">{title}</p>
    );
  }
}

CategoryItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoryItem;
