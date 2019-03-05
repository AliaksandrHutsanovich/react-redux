import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';
import { Input } from 'antd';
import { showDoneTasks, searchTasks } from '../../../actions/actions';
import { connect } from 'react-redux';


class Filters extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (e, dispatch) => {
        dispatch(showDoneTasks(e.target.checked));
    }

    onChangePattern = (e, dispatch) => {
        dispatch(searchTasks(e.target.value));
    }

    render() {
        let { dispatch, searchKey, showDone } = this.props;
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

export default connect()(Filters);