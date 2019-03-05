import React from 'react';
import 'antd/dist/antd.css';
import { Tree } from 'antd';
const { TreeNode } = Tree;
import { connect } from 'react-redux';
import { getCategories, isRoutesRendered } from '../selectors/selectors';


function treeOfCategories(TreeNodeTitle) {
    class TreeOfCategories extends React.Component {
        constructor(props) {
            super(props);
        }

        onSelect = (e) => {
        }

        render() {
            const loop = categories => categories.map((category) => {
              if (category.subCategories.length) {
                return <TreeNode key={category.key} className="tree_node" title={<TreeNodeTitle path={category.key} title={category.title} />}>
                          {loop(category.subCategories)}
                        </TreeNode>;
              }
              return <TreeNode key={category.key} className="tree_node" title={<TreeNodeTitle path={category.key} title={category.title} />} />;
            });
            let { onSelectCategory } = this.props;
            return (
              <Tree
                className="draggable-tree"
                draggable
                onSelect={onSelectCategory || this.onSelect}
              >
                {loop(this.props.categories)}
              </Tree>
            );
        }
    }

    const mapStateToProps = state => {
        return {
          categories: getCategories(state)
        }
    }

    return connect(mapStateToProps)(TreeOfCategories);

}

export default treeOfCategories;