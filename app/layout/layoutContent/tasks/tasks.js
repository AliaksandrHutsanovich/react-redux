/* eslint react/forbid-prop-types: 0 */

import React, { useEffect, memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { List } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { countPercentage } from '../../../actions/actions';
import Task from './task';


const Tasks = ({
  dispatch,
  tasks,
  showDone,
  searchKey,
  match,
}) => {
  useEffect(() => {
    dispatch(
      countPercentage({
        done: tasks.filter((task) => task.isFinished).length,
        all: tasks.length,
      }),
    );
  });

  const { url } = match;
  let data = tasks || [];
  data = data
    .map((elem, index) => {
      const newElem = elem;
      newElem.index = index;
      return newElem;
    })
    .filter((elem) => elem.isFinished === showDone)
    .filter((elem) => elem.title.match(searchKey));
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        className="list"
        split={false}
        renderItem={
          (item) => (
            <List.Item className="list-item">
              <Task
                index={item.index}
                url={url}
                title={item.title}
                description={item.Description}
                isFinished={item.isFinished}
              />
            </List.Item>
          )
        }
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  tasks: state.actionReducers
    .getIn((props.url + '-tasks').split('-'))
    .toArray()
    .map((elem) => elem.toObject()),
});

Tasks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  showDone: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(memo(Tasks));
