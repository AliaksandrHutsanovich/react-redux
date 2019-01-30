import React from 'react'
import AddCategory from './components/AddCategory.jsx'
import AddTask from './components/AddTask.jsx'
import WrapperRouter from './components/WrapperRouter.jsx'
import actions from './actions.jsx'

var connect = require("react-redux").connect;

class AppView extends React.Component {
    render() {
        return <div>
            <AddCategory {...this.props} />
            <AddTask {...this.props} />
            <WrapperRouter {...this.props} />
        </div>
    }
};

function mapStateToProps(state) {
    return {
        titlesCategories: state["titlesCategories"]
    };
}

export default connect(mapStateToProps, actions)(AppView);