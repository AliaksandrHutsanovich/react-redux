import React from 'react';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.title !== this.props.title);
    }

    render() {
        return (
            <p className="item-text">{this.props.title}</p>
        );
    }
}

export default CategoryItem;