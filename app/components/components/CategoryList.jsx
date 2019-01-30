import React from 'react';
import styled from 'styled-components';
import Category from './Category.jsx';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state={categories: (this.props.categories || [])};
    }

    render() {
        console.log(this.props);
        var props=this.props;
        var categories=[];
        var width=95;
        function subCategories(category, width) {
            categories.push(
                <li>
                    <Category {...props} title={category.title} subCategories={category.subCategories} visible={category.visible} width={width} />
                </li>
            );
            if (category.subCategories.length!=0) {
                for (let k=0; k<category.subCategories.length; k++) {
                    subCategories(category.subCategories[k], width-3);
                }
            }
        }

        console.log(props);
        for (let i=0; i<props.titlesCategories.length; i++) {
            subCategories(props.titlesCategories[i], width);
        }

        const Ul=styled.ul`
            list-style-type: none;
        `;

        return (
            <Ul>
                {categories}
            </Ul>
        );
    }
}

export default CategoryList