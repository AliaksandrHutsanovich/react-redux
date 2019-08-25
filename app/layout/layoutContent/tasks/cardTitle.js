import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Icon } from 'antd';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import {
  startEditTaskStatusProcess,
  clearReDo,
  incrementInDone,
  decrementInDone,
} from '../../../actions/actions';
import { getPathParam, getSavingPath } from '../../../hightOrderComponents/utils/utils';

const MyLoadingComponent = () => (<div>Loading...</div>);

const LoadableModal = Loadable({
  loader: () => import('./editTaskModal'),
  loading: MyLoadingComponent,
});

class CardTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, checked: false };
  }

  static getDerivedStateFromProps = (nextProps) => ({ checked: nextProps.isFinished });

  onChange = (e, url, numTask, dispatch) => {
    dispatch(clearReDo());
    const path = (url.replace('/', '') + '-tasks-' + numTask).split('-');
    if (e.target.checked) {
      dispatch(incrementInDone());
    } else {
      dispatch(decrementInDone());
    }
    dispatch(
      startEditTaskStatusProcess({
        path: getSavingPath(path),
        pathParam: getPathParam(path).param,
        value: e.target.checked,
      }),
    );
  }

  showAddModal() {
    this.setState({ visible: true });
  }

  handleModalCancel() {
    this.setState({
      visible: false,
    });
  }

  handleModalOk() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {
      title,
      isFinished,
      url,
      index,
      dispatch,
      description,
    } = this.props;
    const { checked, visible } = this.state;
    return (
      <div>
        <Checkbox checked={checked} onClick={(e) => this.onChange(e, url, index, dispatch)} />
        <span>{title}</span>
        <Icon className="item__button" onClick={this.showAddModal} type="edit" />
        <LoadableModal
          key={index}
          visible={visible}
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

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default connect()(CardTitle);
