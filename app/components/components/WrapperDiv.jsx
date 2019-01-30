import React from 'react';
import styled from 'styled-components';
import CategoryList from './CategoryList.jsx';

class WrapperDiv extends React.Component {

    render() {
        const Div=styled.div`
            background: linear-gradient(to top left, orange, rgb(255, 218, 221));
            width: 30%;
            overflow: auto;
            height: 500px;
            margin-top: 20px;
        `;
        var props=this.props;
        return (
            <Div>
                <CategoryList {...props} />
            </Div>
        );
    }
}

export default WrapperDiv