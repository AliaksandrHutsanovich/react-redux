import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { addCategory, addTask, incrementInAll } from '../actions/actions';
import { startAddCategoryProcess, startAddTaskProcess, clearReDo } from '../actions/actions';

import { connect } from 'react-redux';

function addForm(placeholder) {
    class AddForm extends React.Component {
        constructor(props) {
            super(props);
        };

        state = { value: "" };

        changeValue = (event) => {
            this.setState({ value: event.target.value });
        }

        clickButton = (addAction, dispatch, url) => {
            dispatch(clearReDo());
            if (placeholder === 'Add new category') {
                if (this.state.value) {
                    dispatch(addAction({ title: this.state.value }));
                }
            }
            else if (placeholder === 'Add new task') {
                if (this.state.value) {
                    dispatch(incrementInAll());
                    dispatch(addAction({path: (url.replace('/', '') + '-tasks').split('-'), title: this.state.value }));
                }
            }
            this.setState({ value: "" });
        }

        render() {
            let addAction = startAddCategoryProcess,
                { dispatch, url } = this.props;
            if (placeholder === 'Add new task') {
                addAction = startAddTaskProcess;
            }
            return (
                <div className="form_wrapper">
                    <Input placeholder={placeholder} className="input" value={this.state.value} onChange={this.changeValue} />
                    <Button
                        type="primary"
                        className="button"
                        onClick={() => { this.clickButton(addAction, dispatch, url) }}
                    >Add</Button>
                </div>
            );
        }
    }

    return connect()(AddForm);

}

export default addForm;