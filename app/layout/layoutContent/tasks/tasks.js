/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { countPercentage } from '../../../actions/actions';
import Task from './task';


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, tasks } = this.props;
    dispatch(
      countPercentage({
        done: tasks.filter((task) => task.isFinished).length,
        all: tasks.length,
      }),
    );
  }

  static getDerivedStateFromProps(props) {
    const { dispatch, tasks } = props;
    dispatch(
      countPercentage({
        done: tasks.filter((task) => task.isFinished).length,
        all: tasks.length,
      }),
    );
    return {};
  }

  render() {
    const {
      showDone,
      searchKey,
      tasks,
      match: { url },
    } = this.props;
    let data = tasks || [];
    data = data
      .map((elem) => elem)
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
            (item, index) => (
              <List.Item className="list-item">
                <Task
                  index={index}
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
  }
}

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

export default connect(mapStateToProps)(Tasks);
