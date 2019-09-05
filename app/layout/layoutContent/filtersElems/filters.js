import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showDoneTasks, searchTasks } from '../../../actions/actions';

const onChange = (e, dispatch) => {
  dispatch(showDoneTasks(e.target.checked));
};

const onChangePattern = (e, dispatch) => {
  dispatch(searchTasks(e.target.value));
};

const Filters = ({ dispatch, searchKey, showDone }) => (
  <div className="filters">
    <Checkbox defaultChecked={showDone} onClick={(e) => onChange(e, dispatch)}>
      Show done
    </Checkbox>
    <Input
      placeholder="search"
      style={{ width: 200 }}
      defaultValue={searchKey}
      onChange={(e) => onChangePattern(e, dispatch)}
    />
  </div>
);

Filters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  showDone: PropTypes.bool.isRequired,
};

export default connect()(Filters);
