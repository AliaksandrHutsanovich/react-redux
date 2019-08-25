import React from 'react';
import 'antd/dist/antd.css';
import { Tree } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories } from '../selectors/selectors';

const { TreeNode } = Tree;


function treeOfCategories(TreeNodeTitle) {
  class TreeOfCategories extends React.Component {
    onSelect = () => {}

    getTreeNodes(categories) {
      return categories.map((category) => {
        if (category.subCategories.length) {
          return (
            <TreeNode key={category.key} className="tree_node" title={<TreeNodeTitle path={category.key} title={category.title} />}>
              {this.getTreeNodes(category.subCategories)}
            </TreeNode>
          );
        }
        return <TreeNode key={category.key} className="tree_node" title={<TreeNodeTitle path={category.key} title={category.title} />} />;
      });
    }

    render() {
      const { onSelectCategory, categories } = this.props;
      return (
        <Tree
          className="draggable-tree"
          draggable
          onSelect={onSelectCategory || this.onSelect}
        >
          {this.getTreeNodes(categories)}
        </Tree>
      );
    }
  }

  TreeOfCategories.propTypes = {
    onSelectCategory: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf({}).isRequired,
  };

  const mapStateToProps = (state) => ({ categories: getCategories(state) });

  return connect(mapStateToProps)(TreeOfCategories);
}

export default treeOfCategories;
