import React, { memo } from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import Task from '../task';

const TaskItem = ({
  index,
  title,
  description,
  isFinished,
  location,
  url,
  chosenUrl,
}) => (
  <List.Item>
    <Task
      index={index}
      url={url}
      title={title}
      description={description}
      isFinished={isFinished}
      location={location}
      isOutlined={chosenUrl === url.replace('/', '') + '-tasks-' + index}
    />
  </List.Item>
);

TaskItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  url: PropTypes.string.isRequired,
  chosenUrl: PropTypes.string.isRequired,
};

export default memo(TaskItem);
