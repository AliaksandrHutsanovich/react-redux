import React from 'react';
import 'antd/dist/antd.css';
import addForm from '../../hightOrderComponents/addForm';
import Category from './categories/category';
import treeOfCategories from '../../hightOrderComponents/treeOfCategories';

const Categories = treeOfCategories(Category);

const AddCategory = addForm('Add new category');

class LayoutSiderContent extends React.Component {
  render() {
    return (
      <div>
        <AddCategory />
        <Categories />
      </div>
    );
  }
}

export default LayoutSiderContent;
