import React from 'react';
import { shallow } from 'enzyme';
import CategoryItem from '../categoryItem';

describe('Unit test of category item component', () => {
  const Component = shallow(<CategoryItem title="A title of category" />);
  it('full render test', () => {
    expect(Component).toMatchSnapshot();
  });
});
