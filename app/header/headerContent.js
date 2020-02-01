import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import { Progress, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { startUnDoProcess, startReDoProcess } from '../actions';

import styles from './headerContent.css';

const HeaderContent = ({
  percentage,
  numUnDoObjs,
  numReDoObjs,
  dispatch,
}) => (
  <div>
    <div className={styles.headerMenu}>
      <h1 className={styles.headerLogo}>Task Accountant</h1>
      <Button.Group size="small">
        <Button type="primary" disabled={!numUnDoObjs} onClick={useCallback(() => dispatch(startUnDoProcess()), [dispatch])}>
          <Icon type="left" />
          Backward
        </Button>
        <Button type="primary" disabled={!numReDoObjs} onClick={useCallback(() => dispatch(startReDoProcess()), [dispatch])}>
          Forward
          <Icon type="right" />
        </Button>
      </Button.Group>
    </div>
    <Progress className={styles.progressBar} percent={percentage} strokeColor="red" showInfo={false} />
  </div>
);


HeaderContent.propTypes = {
  percentage: PropTypes.number.isRequired,
  numUnDoObjs: PropTypes.number.isRequired,
  numReDoObjs: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const done = state.countPerсent.get('done');
  const all = state.countPerсent.get('all');
  const percent = all ? (done / all) * 100 : 0;
  return {
    percentage: percent,
    numUnDoObjs: state.unDoReducer.get('undoOperations').toArray().length,
    numReDoObjs: state.reDoReducer.get('redoOperations').toArray().length,
  };
};

export default connect(mapStateToProps)(memo(HeaderContent));
