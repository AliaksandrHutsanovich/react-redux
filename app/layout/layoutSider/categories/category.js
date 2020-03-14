import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import OPERATION_TITLES from '../../../constants';
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

  toggleAddModal = () => {
    const { addModalVisible } = this.state;
    this.setState({
      addModalVisible: !addModalVisible,
    });
  };

  toggleEditModal = () => {
    const { editModalVisible } = this.state;
    this.setState({
      editModalVisible: !editModalVisible,
    });
  };

  toggleDeleteModal = () => {
    const { deleteModalVisible } = this.state;
    this.setState({
      deleteModalVisible: !deleteModalVisible,
    });
  };

  render() {
    const { addModalVisible, editModalVisible, deleteModalVisible } = this.state;
    const { path, title } = this.props;
    return (
      <div>
        <span><Link to={`/${path}`}>{title}</Link></span>
        <Icon className={styles.itemButton} type="edit" onClick={this.toggleEditModal} />
        <Icon className={styles.itemButton} type="plus" onClick={this.toggleAddModal} />
        <Icon className={styles.itemButton} type="delete" onClick={this.toggleDeleteModal} />
        <ChangingDataDialog
          visible={addModalVisible}
          onOk={this.toggleAddModal}
          onCancel={this.toggleAddModal}
          path={path}
          operationTitle={OPERATION_TITLES.ADD_NEW_SUBCATEGORY}
          formId={`addNewSubCategory-${title}`}
        />
        <ChangingDataDialog
          visible={editModalVisible}
          onOk={this.toggleEditModal}
          onCancel={this.toggleEditModal}
          path={path}
          title={title}
          operationTitle={OPERATION_TITLES.EDIT_CATEGORY}
          formId={`editCategory-${title}`}
        />
        <ChangingDataDialog
          visible={deleteModalVisible}
          onOk={this.toggleDeleteModal}
          onCancel={this.toggleDeleteModal}
          path={path}
          title={title}
          operationTitle={OPERATION_TITLES.DELETE_CATEGORY}
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
