import React from 'react';
import 'antd/dist/antd.css';
import {
  Modal, Input, Form, Checkbox, Row, Col,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import treeOfCategories from '../../../hightOrderComponents/treeOfCategories';
import CategoryItem from './categoryItem';
import {
  startEditTaskProcess,
  clearReDo,
} from '../../../actions/actions';
import getStateValue, { getOldPathParams } from './utils/utils';

const { TextArea } = Input;
const Categories = treeOfCategories(CategoryItem);

class EditTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPath: '',
      title: '',
      description: '',
      isFinished: '',
      isStatusChanged: false,
    };
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSaveTask = this.onSaveTask.bind(this);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
    this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
    this.onChangeTaskTitle = this.onChangeTaskTitle.bind(this);
  }

  onSelectCategory(e) {
    this.setState({ selectedPath: e[0] });
  }

  onSaveTask(
    e,
    dispatch,
    newPath,
    oldPath,
    title,
    description,
    isFinished,
    handleOk,
    oldPathParam,
    newPathParam,
  ) {
    dispatch(clearReDo());
    const {
      isStatusChanged,
      title: stateTitle,
      description: stateDescription,
      isFinished: stateIsFinished,
    } = this.state;
    dispatch(startEditTaskProcess({
      newPath,
      oldPath,
      oldPathParam,
      newPathParam,
      title: stateTitle || title,
      description: stateDescription || description,
      isFinished: stateIsFinished === '' ? isFinished : getStateValue(stateIsFinished, isStatusChanged, dispatch),
    }));
    handleOk();
  }

  onChangeTaskStatus(e, isFinished) {
    if (e.target.checked === isFinished) {
      this.setState({ isFinished: e.target.checked, isStatusChanged: false });
    } else {
      this.setState({ isFinished: e.target.checked, isStatusChanged: true });
    }
  }

  onChangeTaskDescription(e) { this.setState({ description: e.target.value }); }

  onChangeTaskTitle(e) { this.setState({ title: e.target.value }); }


  render() {
    const {
      taskTitle,
      description,
      isFinished,
      oldPath,
      handleOk,
      dispatch,
      visible,
      handleCancel,
    } = this.props;
    const { selectedPath } = this.state;
    const oldPathParams = getOldPathParams(oldPath.split('-'));
    const newPath = selectedPath ? (selectedPath + '-tasks').split('-') : '';
    const newPathParam = '';

    return (
      <Modal
        title="Edit task"
        visible={visible}
        onOk={(e) => this.onSaveTask(
          e,
          dispatch,
          newPath,
          oldPathParams.oldPath,
          taskTitle,
          description,
          isFinished,
          handleOk,
          oldPathParams.oldPathParam,
          newPathParam,
        )}
        onCancel={handleCancel}
        okText="Save changes"
        width="900px"
      >
        <Form>
          <Row>
            <Col span={12}>
              <Categories onSelectCategory={this.onSelectCategory} />
            </Col>
            <Col span={12}>
              <Row>
                <Input
                  defaultValue={taskTitle}
                  placeholder="Input task title"
                  onChange={this.onChangeTaskTitle}
                  required
                />
              </Row>
              <Row>
                <Checkbox
                  defaultChecked={isFinished}
                  onChange={(e) => this.onChangeTaskStatus(e, isFinished)}
                >
                  Done
                </Checkbox>
              </Row>
              <Row>
                <TextArea
                  rows={4}
                  defaultValue={description}
                  onChange={this.onChangeTaskDescription}
                  placeholder="Input type description"
                />
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  taskTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired,
  oldPath: PropTypes.string.isRequired,
  handleOk: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default connect()(EditTaskModal);
