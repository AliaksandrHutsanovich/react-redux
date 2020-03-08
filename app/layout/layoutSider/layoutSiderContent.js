import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { AddForm } from '../../reusableComponents';
import Category from './categories';
import treeOfCategories from '../../hightOrderComponents';
import OPERATION_TITLES from '../../constants';

const Categories = treeOfCategories(Category);

const LayoutSiderContent = () => (
  <div>
    <AddForm placeholder={OPERATION_TITLES.ADD_NEW_CATEGORY} />
    <Categories />
  </div>
);


export default memo(LayoutSiderContent);
