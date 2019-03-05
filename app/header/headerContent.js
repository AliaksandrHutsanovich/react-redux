import React from 'react';
import 'antd/dist/antd.css';
import { Progress, Button, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startUnDoProcess, startReDoProcess } from '../actions/actions';

class HeaderContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { percentage, numUnDoObjs, numReDoObjs, dispatch } = this.props;
        return (
            <div>
                <div className="header__menu">
                    <h1>Task Accountant</h1>
                    <Button.Group size='small'>
                        <Button type="primary" disabled={!numUnDoObjs} onClick={() => dispatch(startUnDoProcess())}>
                            <Icon type="left" />Backward
                        </Button>
                        <Button type="primary" disabled={!numReDoObjs} onClick={() => dispatch(startReDoProcess())}>
                            Forward<Icon type="right" />
                        </Button>
                    </Button.Group>
                </div>
                <Progress className="progress_bar" percent={percentage} strokeColor="red" showInfo={false} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    let done = state.countPerсent.get('done'),
        all = state.countPerсent.get('all');
    let percentage = all ? (done / all) * 100 : 0;
    let unDoObjs = state.unDoReducer.get('undoOperations');
    return {
        percentage: percentage,
        numUnDoObjs: state.unDoReducer.get('undoOperations').toArray().length,
        numReDoObjs: state.reDoReducer.get('redoOperations').toArray().length
    }
}

export default connect(mapStateToProps)(HeaderContent);