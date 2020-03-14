/* eslint react/forbid-prop-types: 0 */
import React, {
  useState,
  memo,
  useCallback,
  useMemo,
} from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import {
  Modal, Input, Form, Checkbox, Row, Col, Typography,
} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import treeOfCategories from '../../../../hightOrderComponents';
import CategoryItem from '../categoryItem';
import { startEditTaskProcess } from '../../../../actions';
import getStateValue, { getOldPathParams } from '../utils';
import { validate, execute } from '../../../../sagas';
import usePrevious, { usePrimaryValuesInForm } from '../../../../hooks';

const { TextArea } = Input;
const { Text } = Typography;
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
  const {
    handleSubmit,
    control,
    errors,
    getValues,
    reset,
    setError,
  } = useForm();

  const [selectedPath, setSelectPath] = useState('');

  const onSelectCategory = (e) => {
    setSelectPath(e[0]);
  };

  const previousVisibleValue = usePrevious(visible);

  usePrimaryValuesInForm(
    visible,
    previousVisibleValue,
    getValues(),
    { title: taskTitle, description, isFinished },
    reset,
  );

  const onSaveTask = useCallback((
    newPath,
    oldPathProp,
    oldPathParamProp,
    newPathParam,
    geoLocation,
    stateTitle,
    stateDescription,
    stateIsFinished,
  ) => {
    const isStatusChanged = getValues().isFinished !== isFinished;
    dispatch(startEditTaskProcess({
      newPath,
      oldPath: oldPathProp,
      oldPathParam: oldPathParamProp,
      newPathParam,
      title: stateTitle,
      description: stateDescription,
      isFinished: getStateValue(stateIsFinished, isStatusChanged, dispatch),
      location: geoLocation,
    }));
  }, [
    dispatch,
    isFinished,
    getValues,
  ]);

  const handleCloseDialog = () => {
    handleCancel();
    reset({
      title: taskTitle,
      isFinished,
      description,
    });
  };

  const oldPathParams = useMemo(() => getOldPathParams(oldPath.split('-')), [oldPath]);
  const newPath = useMemo(() => (selectedPath ? (selectedPath + '-tasks').split('-') : ''), [selectedPath]);
  const newPathParam = '';

  const onSubmit = useCallback(async ({
    title,
    isFinished: stateIsFinished,
    description: stateDescription,
  }) => {
    const isError = newPath ? await execute(
      validate, {
        payload: { path: newPath, title },
      },
    ) : await execute(
      validate, {
        payload: { path: oldPathParams.oldPath, title },
      },
    );

    if ((isError && newPath) || (isError && !newPath && taskTitle !== title)) {
      setError('title', 'notMatch', 'An item with the same name exists');
    } else {
      handleOk();
      onSaveTask(
        newPath,
        oldPathParams.oldPath,
        oldPathParams.oldPathParam,
        newPathParam,
        location,
        title,
        stateDescription,
        stateIsFinished,
      );
    }
  }, [
    location,
    newPath,
    oldPathParams.oldPath,
    oldPathParams.oldPathParam,
    onSaveTask,
    setError,
    handleOk,
    taskTitle,
  ]);

  return (
    <Modal
      title="Edit task"
      visible={visible}
      onCancel={handleCloseDialog}
      okText="Save changes"
      width="900px"
      okButtonProps={{
        htmlType: 'submit',
        form: `editTaskForm-${taskTitle}`,
      }}
    >
      <Form
        id={`editTaskForm-${taskTitle}`}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="edit-task-form"
      >
        <Row>
          <Col span={12}>
            <Categories onSelectCategory={onSelectCategory} />
          </Col>
          <Col span={12}>
            <Row>
              <Controller
                as={(<Input placeholder="Input task title" />)}
                rules={{ required: 'This is required' }}
                control={control}
                name="title"
                defaultValue={taskTitle}
              />
              {
                errors.title
                  && (
                    <Text
                      type="danger"
                    >
                      {errors.title.message}
                    </Text>
                  )
              }
            </Row>
            <Row>
              <Controller
                as={(<Checkbox>Done</Checkbox>)}
                control={control}
                name="isFinished"
                valueName="checked"
                defaultValue={isFinished}
              />
            </Row>
            <Row>
              <Controller
                as={(
                  <TextArea
                    rows={4}
                    placeholder="Input type description"
                  />
                )}
                control={control}
                name="description"
                defaultValue={description}
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
