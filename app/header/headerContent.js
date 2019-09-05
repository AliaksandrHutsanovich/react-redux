import React, { memo } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Progress, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { startUnDoProcess, startReDoProcess } from '../actions/actions';

const HeaderContent = ({
  percentage,
  numUnDoObjs,
  numReDoObjs,
  dispatch,
}) => (
  <div>
    <div className="header__menu">
      <h1>Task Accountant</h1>
      <Button.Group size="small">
        <Button type="primary" disabled={!numUnDoObjs} onClick={() => dispatch(startUnDoProcess())}>
          <Icon type="left" />
          Backward
        </Button>
        <Button type="primary" disabled={!numReDoObjs} onClick={() => dispatch(startReDoProcess())}>
          Forward
          <Icon type="right" />
        </Button>
      </Button.Group>
    </div>
    <Progress className="progress_bar" percent={percentage} strokeColor="red" showInfo={false} />
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
