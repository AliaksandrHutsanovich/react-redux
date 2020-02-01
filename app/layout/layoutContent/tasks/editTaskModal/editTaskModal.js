/* eslint react/forbid-prop-types: 0 */
import React, {
  useState,
  memo,
  useCallback,
  useMemo,
} from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import {
  Modal, Input, Form, Checkbox, Row, Col,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import treeOfCategories from '../../../../hightOrderComponents';
import CategoryItem from '../categoryItem';
import {
  startEditTaskProcess,
  clearReDo,
} from '../../../../actions';
import getStateValue, { getOldPathParams } from '../utils';

const { TextArea } = Input;
export const Categories = treeOfCategories(CategoryItem);

export const EditTaskModal = ({
  taskTitle,
  description,
  isFinished,
  oldPath,
  handleOk,
  dispatch,
  visible,
  handleCancel,
  location,
}) => {
  const [selectedPath, setSelectPath] = useState('');
  const [stateTitle, setStateTitle] = useState('');
  const [stateDescription, setStateDescription] = useState('');
  const [stateIsFinished, setStateIsFinished] = useState('');
  const [isStatusChanged, setIsStatusChanged] = useState('');

  const onSelectCategory = (e) => {
    setSelectPath(e[0]);
  };

  const onSaveTask = useCallback((
    newPath,
    oldPathProp,
    oldPathParamProp,
    newPathParam,
    geoLocation,
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
      location: geoLocation,
    }));
    handleOk();
  }, [
    description,
    dispatch,
    handleOk,
    isFinished,
    isStatusChanged,
    stateDescription,
    stateIsFinished,
    stateTitle,
    taskTitle,
  ]);

  const onChangeTaskStatus = useCallback((e) => {
    if (e.target.checked === isFinished) {
      setStateIsFinished(e.target.checked);
      setIsStatusChanged(false);
    } else {
      setStateIsFinished(e.target.checked);
      setIsStatusChanged(true);
    }
  }, [isFinished]);

  const onChangeTaskDescription = useCallback((e) => { setStateDescription(e.target.value); }, []);

  const onChangeTaskTitle = useCallback((e) => { setStateTitle(e.target.value); }, []);

  const oldPathParams = useMemo(() => getOldPathParams(oldPath.split('-')), [oldPath]);
  const newPath = useMemo(() => (selectedPath ? (selectedPath + '-tasks').split('-') : ''), [selectedPath]);
  const newPathParam = '';

  return (
    <Modal
      title="Edit task"
      visible={visible}
      onOk={useCallback(() => onSaveTask(
        newPath,
        oldPathParams.oldPath,
        oldPathParams.oldPathParam,
        newPathParam,
        location,
      ), [
        location,
        newPath,
        oldPathParams.oldPath,
        oldPathParams.oldPathParam,
        onSaveTask,
      ])}
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
                onChange={useCallback((e) => onChangeTaskStatus(e), [onChangeTaskStatus])}
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
  location: PropTypes.object.isRequired,
};

export default connect()(memo(EditTaskModal));
