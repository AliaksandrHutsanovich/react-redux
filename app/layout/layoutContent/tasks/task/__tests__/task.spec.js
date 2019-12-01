import React from 'react';
import { shallow } from 'enzyme';
import Task from '../task';

describe('Unit test of edit task', () => {
  const Component = shallow(
    <Task
      title="Buy a new car"
      description="New car in dealer house"
      isFinished={false}
      index={0}
      url="categories-0-tasks-0"
    />,
  );

  it('Full render test of task', () => {
    expect(Component.dive()).toMatchSnapshot();
  });
});
