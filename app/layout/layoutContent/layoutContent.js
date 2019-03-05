import React from 'react';
import Filters from './filtersElems/filters';
import addForm from '../../hightOrderComponents/addForm';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Tasks from './tasks/tasks';

const AddTask = addForm('Add new task');

class LayoutContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { props } = this;
        let { showDone, searchKey } = this.props;
        let { url } = this.props.match;
        return (
            <div>
                <AddTask url={url} />
                <Filters showDone={showDone} searchKey={searchKey} />
                <Tasks {...props}  />
            </div>
        );
    } 
}


export default LayoutContent;