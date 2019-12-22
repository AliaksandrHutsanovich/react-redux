import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { AddForm } from '../../reusableComponents';
import Category from './categories';
import treeOfCategories from '../../hightOrderComponents';

const Categories = treeOfCategories(Category);

const LayoutSiderContent = () => (
  <div>
    <AddForm placeholder="Add new category" />
    <Categories />
  </div>
);


export default memo(LayoutSiderContent);
