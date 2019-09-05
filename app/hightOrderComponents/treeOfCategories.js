import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Tree } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories } from '../selectors/selectors';

const { TreeNode } = Tree;

const treeOfCategories = (TreeNodeTitle) => {
  const getTreeNodes = (categories) => categories.map((category) => {
    if (category.subCategories.length) {
      return (
        <TreeNode
          key={category.key}
          className="tree_node"
          title={<TreeNodeTitle path={category.key} title={category.title} />}
        >
          {getTreeNodes(category.subCategories)}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        key={category.key}
        className="tree_node"
        title={(
          <TreeNodeTitle
            path={category.key}
            title={category.title}
          />
        )}
      />
    );
  });

  const TreeOfCategories = ({ onSelectCategory, categories }) => (
    <Tree
      className="draggable-tree"
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
