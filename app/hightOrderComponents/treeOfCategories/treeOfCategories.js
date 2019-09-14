import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { Tree } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories } from '../../selectors/selectors';

import styles from './treeOfCategories.css';

const { TreeNode } = Tree;

const treeOfCategories = (TreeNodeTitle) => {
  const getTreeNode = (category, getChildNodes) => (
    <TreeNode
      key={category.key}
      title={<TreeNodeTitle path={category.key} title={category.title} />}
    >
      {getChildNodes && getChildNodes(category.subCategories)}
    </TreeNode>
  );

  const getTreeNodes = (categories) => categories.map((category) => {
    if (category.subCategories.length) {
      return getTreeNode(category, getTreeNodes);
    }
    return getTreeNode(category);
  });

  const TreeOfCategories = ({ onSelectCategory, categories }) => (
    <Tree
      className={styles.draggableTree}
      draggable
      onSelect={onSelectCategory}
    >
      {getTreeNodes(categories)}
    </Tree>
  );

  TreeOfCategories.defaultProps = {
    onSelectCategory: () => {},
  };

  TreeOfCategories.propTypes = {
    onSelectCategory: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  const mapStateToProps = (state) => ({ categories: getCategories(state) });

  return connect(mapStateToProps)(memo(TreeOfCategories));
};

export default treeOfCategories;
