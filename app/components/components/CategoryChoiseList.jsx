import React from 'react'
import styled from 'styled-components'
import CategoryChoise from './CategoryChoise.jsx'

class CategoryChoiseList extends React.Component {
    constructor(props) {
        super(props);
        this.state={categories: (this.props.categories || [])};
    }

    render() {
        var categories=[];
        var width=95;
        function subCategories(category, width) {
            categories.push(
                <li>
                    <CategoryChoise title={category.title} width={width} />
                </li>
            );
            if (category.subCategories.length!=0) {
                for (let k=0; k<category.subCategories.length; k++) {
                    subCategories(category.subCategories[k], width-3);
                }
            }
        }

        for (let i=0; i<this.state.categories.length; i++) {
            categories.push(
                <li>
                    <CategoryChoise title={this.state.categories[i].title} width={width} />
                </li>
            );
            if (this.state.categories[i].subCategories.length!=0) {
                for (let j=0; j<this.state.categories[i].subCategories.length; j++) {
                    subCategories(this.props.categories[i].subCategories[j], width-3);
                }
            }
        }

        const Ul=styled.ul`
            background: linear-gradient(to top left, red, #ff65d8);
            list-style-type: none;
            padding-top: 10px;
            padding-right: 10px;
            width: 30%;
            overflow: auto;
            height: 500px;
            margin-top: 20px;
            
        `;

        return (
            <Ul>
                {categories}
            </Ul>
        );
    }
}

export default CategoryChoiseList