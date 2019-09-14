import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import addForm from '../../hightOrderComponents/addForm';
import Category from './categories/category';
import treeOfCategories from '../../hightOrderComponents/treeOfCategories';

const Categories = treeOfCategories(Category);

const AddCategory = addForm('Add new category');

const LayoutSiderContent = () => (
  <div>
    <AddCategory />
    <Categories />
  </div>
);


export default memo(LayoutSiderContent);
