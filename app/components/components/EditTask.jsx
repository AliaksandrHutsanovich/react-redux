import React from 'react'
import CategoryChoiseList from './CategoryChoiseList.jsx'
import DescriptionPanel from './DescriptionPanel.jsx'


class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state={title: "", description: "", status: ""};
    }
    render() {
        return (
            <div>
                <CategoryChoiseList {...this.props} categories={this.props.titlesCategories}/>
                <DescriptionPanel {...this.props} title={this.props.title} description={this.props.description} status={this.props.status}/>
            </div>
        );
    }
}

export default EditTask