import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { clearReDo } from '../actions/actions';
import { caseClickHandlers, kindsOfAddActions } from './utils/caseClickHandlers';

function addForm(placeholder) {
  class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
    }

    changeValue(event) {
      this.setState({ value: event.target.value });
    }

    clickButton(addAction, dispatch, url) {
      const { value } = this.state;
      dispatch(clearReDo());
      caseClickHandlers[placeholder](dispatch, value, addAction, url);
      this.setState({ value: '' });
    }

    render() {
      const { dispatch, url } = this.props;
      const { value } = this.state;
      const addAction = kindsOfAddActions[placeholder];
      return (
        <div className="form_wrapper">
          <Input placeholder={placeholder} className="input" value={value} onChange={this.changeValue} />
          <Button
            type="primary"
            className="button"
            onClick={() => { this.clickButton(addAction, dispatch, url); }}
          >
            Add
          </Button>
        </div>
      );
    }
  }

  AddForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  };

  return connect()(AddForm);
}

export default addForm;
