import React from 'react'
import styled from 'styled-components'

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Div1=styled.div`
           margin-top: 77px;
        `;

        const Form=styled.form`
           display: inline;
        `;

        return (
            <Div1>
                <Form name="newCategory">
                    <input type="text" name="Category1" placeholder="Add new category" />
                </Form>
                <button onClick={()=>{
                    var newCategory=document.newCategory.Category1.value;
                    document.newCategory.Category1.value="";
                    if (newCategory!="") {
                        newCategory={title: newCategory, subCategories: [], tasks: []};
                        this.props.addCategory(newCategory);
                    }
                }}>Add</button>
            </Div1>
        );

    }
}

export default AddCategory