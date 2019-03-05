import React from 'react';
import 'antd/dist/antd.css';
import { 
    Modal, Button, Input, Form, Checkbox, Row, Col 
} from 'antd';
import treeOfCategories from '../../../hightOrderComponents/treeOfCategories';
import CategoryItem from './categoryItem';
import { connect } from 'react-redux';
import { editTask } from '../../../actions/actions';
import { startEditTaskProcess, clearReDo } from '../../../actions/actions';
import { incrementInDone, decrementInDone } from '../../../actions/actions';

const {TextArea} = Input;
const Categories = treeOfCategories(CategoryItem);

class EditTaskModal extends React.Component {
    constructor(props) {
        super(props);
    }

    state = { selectedPath: '', title: '', description: '', isFinished: '', isStatusChanged: false }

    onSelectCategory = (e) => {
        this.setState({selectedPath: e[0]});
    }

    onSaveTask = (e, dispatch, newPath, oldPath, title, description, isFinished, handleOk, oldPathParam, newPathParam) => {
        dispatch(clearReDo());
        let isStatusChanged = this.state.isStatusChanged;
        let isFinishedTask = this.state.isFinished;

        function getStateValue() {
            if (isStatusChanged) {
                isFinishedTask ? dispatch(incrementInDone()) : dispatch(decrementInDone());
            }
            return isFinishedTask;
        }

        dispatch(startEditTaskProcess({ 
            newPath: newPath, 
            oldPath: oldPath,
            oldPathParam: oldPathParam,
            newPathParam: newPathParam,
            title: this.state.title || title, 
            description: this.state.description || description, 
            isFinished: this.state.isFinished === '' ? isFinished : getStateValue()
        }));
        handleOk();
    }

    onChangeTaskStatus = (e, isFinished) => { 
        if (e.target.checked === isFinished) {
            this.setState({ isFinished: e.target.checked, isStatusChanged: false });
        }
        else {
            this.setState({ isFinished: e.target.checked, isStatusChanged: true });
        }
    }
    onChangeTaskDescription = (e) => this.setState({ description: e.target.value });
    onChangeTaskTitle = (e) => this.setState({ title: e.target.value });


    render() {
        let { taskTitle, description, isFinished, oldPath, handleOk, dispatch } = this.props;

        oldPath = oldPath.split('-');
        let oldPathParam = oldPath[oldPath.length - 1];
        oldPath = oldPath.filter((x, index, oldPath) => index < oldPath.length - 1);
        let { selectedPath, title } = this.state;
        let newPath = selectedPath ? (selectedPath + '-tasks').split('-') : '';
        let newPathParam = '';

        return (
            <Modal 
                title="Edit task"
                visible={this.props.visible}
                onOk={(e) => this.onSaveTask(e, dispatch, newPath, oldPath, taskTitle, description, isFinished, handleOk, oldPathParam, newPathParam )}
                onCancel={this.props.handleCancel}
                okText="Save changes"
                width="900px">
                <Form>
                    <Row>
                        <Col span={12}>
                            <Categories onSelectCategory={this.onSelectCategory} />
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Input defaultValue={taskTitle} placeholder="Input task title" onChange={this.onChangeTaskTitle} required />
                            </Row>
                            <Row>
                                <Checkbox defaultChecked={isFinished} onChange={this.onChangeTaskStatus}>Done</Checkbox>
                            </Row>
                            <Row>
                                <TextArea rows={4} defaultValue={description} onChange={this.onChangeTaskDescription} placeholder="Input type description" />
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default connect()(EditTaskModal);

