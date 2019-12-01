import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import AddCategory from '../../reusableComponents/addForm/addForm';
import Category from './categories/category';
import treeOfCategories from '../../hightOrderComponents/treeOfCategories/treeOfCategories';

const Categories = treeOfCategories(Category);

const LayoutSiderContent = () => (
  <div>
    <AddCategory placeholder="Add new category" />
    <Categories />
  </div>
);


export default memo(LayoutSiderContent);
