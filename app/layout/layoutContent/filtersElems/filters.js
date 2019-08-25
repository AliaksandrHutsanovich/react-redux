import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showDoneTasks, searchTasks } from '../../../actions/actions';


class Filters extends React.Component {
  onChange = (e, dispatch) => {
    dispatch(showDoneTasks(e.target.checked));
  }

  onChangePattern = (e, dispatch) => {
    dispatch(searchTasks(e.target.value));
  }

  render() {
    const { dispatch, searchKey, showDone } = this.props;
    return (
      <div className="filters">
        <Checkbox defaultChecked={showDone} onClick={(e) => this.onChange(e, dispatch)}>
          Show done
        </Checkbox>
        <Input
          placeholder="search"
          style={{ width: 200 }}
          defaultValue={searchKey}
          onChange={(e) => this.onChangePattern(e, dispatch)}
        />
      </div>
    );
  }
}

Filters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  showDone: PropTypes.bool.isRequired,
};

export default connect()(Filters);
