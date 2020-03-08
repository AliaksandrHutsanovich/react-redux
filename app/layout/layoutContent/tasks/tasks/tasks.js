/* eslint react/forbid-prop-types: 0 */

import React, { useEffect, memo, useMemo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { List } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { countPercentage } from '../../../../actions';
import TaskItem from './taskItem';

import styles from './tasks.css';

const Tasks = ({
  dispatch,
  tasks,
  showDone,
  searchKey,
  match: { url },
  chosenUrl,
}) => {
  useEffect(() => {
    dispatch(
      countPercentage({
        done: tasks.filter((task) => task.isFinished).length,
        all: tasks.length,
      }),
    );
  });

  const data = useMemo(() => (tasks || [])
    .map((elem, index) => {
      const newElem = elem;
      newElem.index = index;
      return newElem;
    })
    .filter((elem) => elem.isFinished === showDone)
    .filter((elem) => elem.title.match(searchKey)), [tasks, searchKey, showDone]);
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        className={styles.list}
        split={false}
        renderItem={
          (task) => (
            <TaskItem
              {...task}
              url={url}
              chosenUrl={chosenUrl}
            />
          )
        }
      />
    </div>
  );
};

const mapStateToProps = ({
  actionReducers,
  contentDisplay,
}, props) => ({
  tasks: actionReducers
    .getIn((props.match.url.replace('/', '') + '-tasks').split('-'))
    .toArray()
    .map(
      (elem) => elem.update(
        'location',
        (location) => location.toObject(),
      ).toObject(),
    ),
  chosenUrl: contentDisplay.get('url'),
});

Tasks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  showDone: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  chosenUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(memo(Tasks));
