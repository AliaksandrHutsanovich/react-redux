import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { clearReDo } from '../actions/actions';
import { caseClickHandlers, kindsOfAddActions } from './utils/utils';

function addForm(placeholder) {
  class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
      this.changeValue = this.changeValue.bind(this);
      this.clickButton = this.clickButton.bind(this);
    }

    changeValue(event) {
      this.setState({ value: event.target.value });
    }

    clickButton(addAction, dispatch) {
      const { value } = this.state;
      const { url } = this.props;
      dispatch(clearReDo());
      caseClickHandlers[placeholder](dispatch, value, addAction, url);
      this.setState({ value: '' });
    }

    render() {
      const { dispatch } = this.props;
      const { value } = this.state;
      const addAction = kindsOfAddActions[placeholder];
      return (
        <div className="form_wrapper">
          <Input
            placeholder={placeholder}
            className="input"
            value={value}
            onChange={this.changeValue}
          />
          <Button
            type="primary"
            className="button"
            onClick={() => { this.clickButton(addAction, dispatch); }}
          >
            Add
          </Button>
        </div>
      );
    }
  }

  AddForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    url: PropTypes.string,
  };

  AddForm.defaultProps = {
    url: '',
  };

  return connect()(AddForm);
}

export default addForm;
