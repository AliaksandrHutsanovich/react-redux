import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChangingDataDialog } from '../../../reusableComponents';

import styles from './category.css';

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
        <ChangingDataDialog
          visible={addModalVisible}
          handleOk={this.handleAddModalOk}
          handleCancel={this.handleAddModalCancel}
          path={path}
          operationTitle="Add new subcategory"
        />
        <ChangingDataDialog
          visible={editModalVisible}
          handleOk={this.handleEditModalOk}
          handleCancel={this.handleEditModalCancel}
          path={path}
          title={title}
          operationTitle="Edit category"
        />
        <ChangingDataDialog
          visible={deleteModalVisible}
          handleOk={this.handleDeleteModalOk}
          handleCancel={this.handleDeleteModalCancel}
          path={path}
          titleCategory={title}
          operationTitle="Delete category"
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
