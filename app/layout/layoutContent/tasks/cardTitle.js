import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Icon } from 'antd';
import { connect } from 'react-redux';
import { editTaskStatus } from '../../../actions/actions';
import { startEditTaskStatusProcess, clearReDo } from  '../../../actions/actions';
import { incrementInDone, decrementInDone } from '../../../actions/actions';
import Loadable from 'react-loadable';

function MyLoadingComponent() {
    return <div>Loading...</div>;
  }

const LoadableModal = Loadable({
    loader: () => import('./editTaskModal'),
    loading: MyLoadingComponent
});

class CardTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    state = { visible: false, checked: false };

    handleModalOk = (e) => {
        this.setState({
            visible: false
        });
    };

    handleModalCancel = (e) => {
        this.setState({
            visible: false
        });
    }

    showAddModal = () => {
        this.setState({ visible: true });
    }

    static getDerivedStateFromProps = (nextProps, nextState) => ({ checked: nextProps.isFinished });

    onChange = (e, url, numTask, dispatch) => {
        dispatch(clearReDo());
        let path = (url.replace('/', '') + '-tasks-' + numTask).split('-');
        let lenght = path.length;
        let pathParam = path[lenght - 1];
        path.splice(length - 1, 1);
        if (e.target.checked) {
            dispatch(incrementInDone());
        }
        else {
            dispatch(decrementInDone());
        }
        dispatch(startEditTaskStatusProcess({ path: path, pathParam: pathParam, value: e.target.checked }));
    }

    render() {
        let { title, isFinished, url, index, dispatch, description } = this.props;
        return (
            <div>
                <Checkbox checked={this.state.checked} onClick={(e) => this.onChange(e, url, index, dispatch)} />
                <span>{title}</span>
                <Icon className="item__button" onClick={this.showAddModal} type="edit" />
                <LoadableModal
                    key={index}
                    visible={this.state.visible} 
                    handleOk={this.handleModalOk}
                    handleCancel={this.handleModalCancel}
                    taskTitle={title}
                    description={description}
                    isFinished={isFinished}
                    oldPath={url.replace('/', '') + '-tasks-' + index}
                 />
            </div>
        );
    }
}

export default connect()(CardTitle);
