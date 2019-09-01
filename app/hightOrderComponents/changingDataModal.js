import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearReDo } from '../actions/actions';
import { typesCategoryOperation } from './utils/utils';

function changingDataDialog(operationTitle) {
  class ChangingDataDialog extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleClickOk = this.handleClickOk.bind(this);
    }

    handleChange(e) {
      this.setState({ value: e.target.value });
    }

    handleClickOk(handleOk, path, dispatch, title) {
      const { value } = this.state;
      dispatch(clearReDo());
      typesCategoryOperation[operationTitle](path, dispatch, value, title);
      this.setState({ value: '' });
      handleOk();
    }

    render() {
      const {
        dispatch,
        title,
        visible,
        handleOk,
        path,
        titleCategory,
        handleCancel,
      } = this.props;
      return (
        <Modal
          title={operationTitle}
          visible={visible}
          onOk={() => this.handleClickOk(handleOk, path, dispatch, title)}
          onCancel={handleCancel}
        >
          {
            operationTitle === 'Delete category'
              ? <p>{titleCategory}</p>
              : (
                <Input
                  placeholder="input category title"
                  defaultValue={title}
                  onChange={this.handleChange}
                  className="modal-input"
                />
              )
          }
        </Modal>
      );
    }
  }

  ChangingDataDialog.defaultProps = {
    title: '',
    titleCategory: '',
  };

  ChangingDataDialog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    titleCategory: PropTypes.string,
    handleCancel: PropTypes.func.isRequired,
  };

  return connect()(ChangingDataDialog);
}

export default changingDataDialog;
