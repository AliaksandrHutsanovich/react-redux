import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filtersElems/filters';
import addForm from '../../hightOrderComponents/addForm';
import Tasks from './tasks/tasks';

const AddTask = addForm('Add new task');

class LayoutContent extends React.Component {
  render() {
    const { props } = this;
    const { showDone, searchKey } = props;
    const { url } = props.match;
    return (
      <div>
        <AddTask url={url} />
        <Filters showDone={showDone} searchKey={searchKey} />
        <Tasks {...props} />
      </div>
    );
  }
}

LayoutContent.propTypes = {
  showDone: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  match: PropTypes.objectOf().isRequired,
};

export default LayoutContent;
