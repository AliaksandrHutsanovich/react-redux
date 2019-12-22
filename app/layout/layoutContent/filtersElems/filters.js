import React, { memo } from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { Checkbox, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showDoneTasks, searchTasks } from '../../../actions';

import styles from './filters.css';

const onChange = (e, dispatch) => {
  dispatch(showDoneTasks(e.target.checked));
};

const onChangePattern = (e, dispatch) => {
  dispatch(searchTasks(e.target.value));
};

const Filters = ({ dispatch, searchKey, showDone }) => (
  <div className={styles.filters}>
    <Checkbox defaultChecked={showDone} onChange={(e) => onChange(e, dispatch)}>
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

export default connect()(memo(Filters));
