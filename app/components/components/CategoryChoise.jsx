import React from 'react'
import styled from 'styled-components'

class CategoryChoise extends React.Component {
    constructor(props) {
        super(props);
        this.state={title: "", width: 0};
    }

    render() {
        const Div3=styled.div`
            border: 1px solid blue;
            width: ${()=>{
            return this.props.width+"%"}
            };
            margin-left: ${()=>{
            return (100-this.props.width)+"%"}
            };
            height: 30px;
            :hover {
                background-color: green;
            }
            ${document.location.href.includes("/"+this.props.title)}
                background-color: white;
            ${!document.location.href.includes("/"+this.props.title)}
                background-color: olive;
        `;

        const Button1=styled.button`
            width: 20px;
            height: 20px;
            background-size: 16px 16px;
            float: right;
        `;

        return (
            <Div3>
                {this.props.title}
                <Button1 className="choise" onClick={()=>{
                    document.getElementsByClassName("target")[0].setAttribute("id", `${this.props.title}`);
                }}></Button1>
            </Div3>
        );
    }
}

export default CategoryChoise