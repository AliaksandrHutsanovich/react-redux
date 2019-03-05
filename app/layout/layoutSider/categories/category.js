import React from 'react';
import {Icon} from 'antd';
import changingDataModal from '../../../hightOrderComponents/changingDataModal';
import { Link } from 'react-router-dom';

const AddCategoryDialog = changingDataModal("Add new subcategory");
const EditCategoryDialog = changingDataModal("Edit category");
const DeleteCategoryDialog = changingDataModal("Delete category?");

class Category extends React.Component {
    constructor(props) {
        super(props);
    }

    state = { 
        addModalVisible: false, 
        editModalVisible: false, 
        deleteModalVisible: false
    };

    handleAddModalOk = (e) => {
        this.setState({
            addModalVisible: false
        });
    }

    handleEditModalOk = (e) => {
        this.setState({
            editModalVisible: false
        });
    }

    handleDeleteModalOk = (e) => {
        this.setState({
            deleteModalVisible: false
        });
    }

    handleAddModalCancel = (e) => {
        this.setState({
            addModalVisible: false
        });
    }

    handleEditModalCancel = (e) => {
        this.setState({
            editModalVisible: false
        });
    }

    handleDeleteModalCancel = (e) => {
        this.setState({
            deleteModalVisible: false
        });
    }

    showAddModal = () => {
        this.setState({ addModalVisible: true });
    }

    showEditModal = () => {
        this.setState({ editModalVisible: true });
    }

    showDeleteModal = () => {
        this.setState({ deleteModalVisible: true });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.title !== this.props.title || 
                nextState.addModalVisible !== this.state.addModalVisible ||
                nextState.editModalVisible !== this.state.editModalVisible ||
                nextState.deleteModalVisible !== this.state.deleteModalVisible);
    }

    render() {
        return (
            <div>
                <span><Link to={`/${this.props.path}`}>{this.props.title}</Link></span>
                <Icon className="item__button" type="edit" onClick={this.showEditModal} />
                <Icon className="item__button" type="plus" onClick={this.showAddModal} />
                <Icon className="item__button" type="delete" onClick={this.showDeleteModal} />
                <AddCategoryDialog 
                    visible={this.state.addModalVisible} 
                    handleOk={this.handleAddModalOk}
                    handleCancel={this.handleAddModalCancel}
                    path={this.props.path}
                />
                <EditCategoryDialog 
                    visible={this.state.editModalVisible}
                    handleOk={this.handleEditModalCancel} 
                    handleCancel={this.handleEditModalCancel}
                    path={this.props.path}
                    title={this.props.title}
                />
                <DeleteCategoryDialog
                    visible={this.state.deleteModalVisible}
                    handleOk={this.handleDeleteModalOk}
                    handleCancel={this.handleDeleteModalCancel}
                    path={this.props.path}
                    titleCategory={this.props.title}
                />
            </div>
        );
    }
}

export default Category;