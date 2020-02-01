/* eslint react/forbid-prop-types: 0 */
import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { Card, Collapse } from 'antd';
import PropTypes from 'prop-types';
import CardTitle from '../cardTitle';

import styles from './task.css';

const { Panel } = Collapse;

const Task = ({
  description,
  ...props
}) => (
  <Card
    className={styles.listItemContent}
    title={
      (
        <CardTitle
          {...props}
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
  description: PropTypes.string.isRequired,
};

export default memo(Task);
