import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Input } from 'antd';
import { addSubCategory, deleteCategory, editCategory } from '../actions/actions';
import { connect } from 'react-redux';
import { startAddSubCategoryProcess, startEditCategoryProcess, startDeleteCategoryProcess, clearReDo } from '../actions/actions';

function changingDataDialog(operationTitle) {
    class ChangingDataDialog extends React.Component {
        constructor(props) {
            super(props);
        };

        state = {value: ""};

        handleChange = (e) => {
            this.setState({value: e.target.value});
        }


        handleClickOk = (handleOk, path, dispatch, title) => {
            dispatch(clearReDo());
            if (operationTitle === 'Add new subcategory') {
                dispatch(startAddSubCategoryProcess({path: (path + "-subCategories").split('-'), title: this.state.value}));
            }
            else {
                path = path.split('-');
                let lenght = path.length;
                let pathParam = path[lenght - 1];
                path.splice(length - 1, 1);

                if (operationTitle === 'Edit category') {
                    dispatch(startEditCategoryProcess({path: path, pathParam: pathParam, title: this.state.value || title}));
                }
                else {
                    dispatch(startDeleteCategoryProcess({ path: path, pathParam: pathParam }));
                }
            }
            this.setState({ value: "" });
            handleOk();
        }
    
        render() {
            let { dispatch, title } = this.props;
            return (
                <Modal
                   title={operationTitle}
                   visible={this.props.visible}
                   onOk={() => this.handleClickOk(this.props.handleOk, this.props.path, dispatch, title)}
                   onCancel={this.props.handleCancel}
                >
                    {operationTitle === "Delete category?" ? <p>{this.props.titleCategory}</p> :<Input placeholder="input category title" defaultValue={title} value={this.state.value || title} onChange={this.handleChange} className="modal-input" />}
                </Modal>
            );
        }
    }

    return connect()(ChangingDataDialog);
}

export default changingDataDialog;