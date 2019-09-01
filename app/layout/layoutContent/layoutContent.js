/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filtersElems/filters';
import addForm from '../../hightOrderComponents/addForm';
import Tasks from './tasks/tasks';

const AddTask = addForm('Add new task');

class LayoutContent extends React.Component {
  render() {
    const { showDone, searchKey, match: { url } } = this.props;
    return (
      <div>
        <AddTask url={url} />
        <Filters showDone={showDone} searchKey={searchKey} />
        <Tasks {...this.props} />
      </div>
    );
  }
}

LayoutContent.propTypes = {
  showDone: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default LayoutContent;
