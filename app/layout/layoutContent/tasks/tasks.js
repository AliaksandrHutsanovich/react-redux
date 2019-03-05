import React from 'react';
import 'antd/dist/antd.css';
import Task from './task';
import {List} from 'antd';
import { countPercentage } from '../../../actions/actions';
import { connect } from 'react-redux';
import { getTasks } from '../../../selectors/selectors';


class Tasks extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {dispatch, tasks} = this.props;
        tasks = tasks || [];
        dispatch(countPercentage({done: tasks.filter(task => task.isFinished).length, all: tasks.length}));
    }

    componentWillUpdate(nextProps, nextState) {
        let {dispatch, tasks} = nextProps;
        tasks = tasks || [];
        dispatch(countPercentage({done: tasks.filter(task => task.isFinished).length, all: tasks.length}));
    }

    render() {
        let data = this.props.tasks || [];
        let { showDone, searchKey } = this.props;
        let { url } = this.props.match;
        data = data
                .map((elem, index) => {elem.index = index; return elem;})
                .filter(elem => elem.isFinished === showDone)
                .filter(elem => elem.title.match(searchKey));
        return (
           <div>
               <List
                  itemLayout="horizontal"
                  dataSource={data}
                  className="list"
                  split={false}
                  renderItem={(item, index) => (
                      <List.Item className="list-item">
                          <Task index={item.index} url={url} title={item.title} description={item.Description} isFinished={item.isFinished} />
                      </List.Item>
                  )}
                />
           </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    let data = state.actionReducers.getIn((props.url + '-tasks').split('-')).toArray().map(elem => elem.toObject());
    return { tasks: data }
}

export default connect(mapStateToProps)(Tasks);