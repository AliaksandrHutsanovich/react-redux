import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import changingDataModal from '../../../hightOrderComponents/changingDataModal/changingDataModal';

import styles from './category.css';

const AddCategoryDialog = changingDataModal('Add new subcategory');
const EditCategoryDialog = changingDataModal('Edit category');
const DeleteCategoryDialog = changingDataModal('Delete category');

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalVisible: false,
      editModalVisible: false,
      deleteModalVisible: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { addModalVisible, editModalVisible, deleteModalVisible } = this.state;
    const { title } = this.props;
    return (nextProps.title !== title
    || nextState.addModalVisible !== addModalVisible
    || nextState.editModalVisible !== editModalVisible
    || nextState.deleteModalVisible !== deleteModalVisible);
  }

  handleAddModalOk = () => {
    this.setState({
      addModalVisible: false,
    });
  }

  handleEditModalOk = () => {
    this.setState({
      editModalVisible: false,
    });
  }

  handleDeleteModalOk = () => {
    this.setState({
      deleteModalVisible: false,
    });
  }

  handleAddModalCancel = () => {
    this.setState({
      addModalVisible: false,
    });
  }

  handleEditModalCancel = () => {
    this.setState({
      editModalVisible: false,
    });
  }

  handleDeleteModalCancel = () => {
    this.setState({
      deleteModalVisible: false,
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

  render() {
    const { addModalVisible, editModalVisible, deleteModalVisible } = this.state;
    const { path, title } = this.props;
    return (
      <div>
        <span><Link to={`/${path}`}>{title}</Link></span>
        <Icon className={styles.itemButton} type="edit" onClick={this.showEditModal} />
        <Icon className={styles.itemButton} type="plus" onClick={this.showAddModal} />
        <Icon className={styles.itemButton} type="delete" onClick={this.showDeleteModal} />
        <AddCategoryDialog
          visible={addModalVisible}
          handleOk={this.handleAddModalOk}
          handleCancel={this.handleAddModalCancel}
          path={path}
        />
        <EditCategoryDialog
          visible={editModalVisible}
          handleOk={this.handleEditModalCancel}
          handleCancel={this.handleEditModalCancel}
          path={path}
          title={title}
        />
        <DeleteCategoryDialog
          visible={deleteModalVisible}
          handleOk={this.handleDeleteModalOk}
          handleCancel={this.handleDeleteModalCancel}
          path={path}
          titleCategory={title}
        />
      </div>
    );
  }
}

Category.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Category;
