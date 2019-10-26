import React from 'react';
import { mount } from 'enzyme';
import CategoryItem from '../categoryItem';

describe('Unit test of category item component', () => {
  const Component = mount(<CategoryItem title="A title of category" />);
  it('full render test', () => {
    expect(Component).toMatchSnapshot();
  });
});
