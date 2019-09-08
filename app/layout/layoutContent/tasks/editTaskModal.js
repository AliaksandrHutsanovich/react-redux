import React, { useState, memo } from 'react';
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

const EditTaskModal = ({
  taskTitle,
  description,
  isFinished,
  oldPath,
  handleOk,
  dispatch,
  visible,
  handleCancel,
}) => {
  const [selectedPath, setSelectPath] = useState('');
  const [stateTitle, setStateTitle] = useState('');
  const [stateDescription, setStateDescription] = useState('');
  const [stateIsFinished, setStateIsFinished] = useState('');
  const [isStatusChanged, setIsStatusChanged] = useState('');

  const onSelectCategory = (e) => {
    setSelectPath(e[0]);
  };

  const onSaveTask = (
    e,
    newPath,
    oldPathProp,
    oldPathParamProp,
    newPathParam,
  ) => {
    dispatch(clearReDo());
    dispatch(startEditTaskProcess({
      newPath,
      oldPath: oldPathProp,
      oldPathParam: oldPathParamProp,
      newPathParam,
      title: stateTitle || taskTitle,
      description: stateDescription || description,
      isFinished: stateIsFinished === '' ? isFinished : getStateValue(stateIsFinished, isStatusChanged, dispatch),
    }));
    handleOk();
  };

  const onChangeTaskStatus = (e) => {
    if (e.target.checked === isFinished) {
      setStateIsFinished(e.target.checked);
      setIsStatusChanged(false);
    } else {
      setStateIsFinished(e.target.checked);
      setIsStatusChanged(true);
    }
  };

  const onChangeTaskDescription = (e) => { setStateDescription(e.target.value); };

  const onChangeTaskTitle = (e) => { setStateTitle(e.target.value); };

  const oldPathParams = getOldPathParams(oldPath.split('-'));
  const newPath = selectedPath ? (selectedPath + '-tasks').split('-') : '';
  const newPathParam = '';

  return (
    <Modal
      title="Edit task"
      visible={visible}
      onOk={(e) => onSaveTask(
        e,
        newPath,
        oldPathParams.oldPath,
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
            <Categories onSelectCategory={onSelectCategory} />
          </Col>
          <Col span={12}>
            <Row>
              <Input
                defaultValue={taskTitle}
                placeholder="Input task title"
                onChange={onChangeTaskTitle}
                required
              />
            </Row>
            <Row>
              <Checkbox
                defaultChecked={isFinished}
                onChange={(e) => onChangeTaskStatus(e)}
              >
                Done
              </Checkbox>
            </Row>
            <Row>
              <TextArea
                rows={4}
                defaultValue={description}
                onChange={onChangeTaskDescription}
                placeholder="Input type description"
              />
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

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

export default connect()(memo(EditTaskModal));
