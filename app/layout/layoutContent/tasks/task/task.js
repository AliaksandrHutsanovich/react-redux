import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { Card, Collapse } from 'antd';
import PropTypes from 'prop-types';
import CardTitle from '../cardTitle';

import styles from './task.css';

const { Panel } = Collapse;

const Task = ({
  title,
  description,
  isFinished,
  index,
  url,
}) => (
  <Card
    className={styles.listItemContent}
    title={
      (
        <CardTitle
          index={index}
          url={url}
          title={title}
          isFinished={isFinished}
          description={description}
        />
      )
    }
  >
    <Collapse bordered={false}>
      <Panel header="Card content">
        <p>{description}</p>
      </Panel>
    </Collapse>
  </Card>
);

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default memo(Task);
