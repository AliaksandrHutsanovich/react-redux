import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state={title: "", tasks:[], subCategories: [], visible: "", width: 0};
        this.count=1;
    }
    render() {

        const Div4=styled.div`
            display: inline-block;
            margin-left: 10px;
            width: 100px;
            height: 25px;
            overflow: hidden;
        `;

        const Button1=styled.button`
            width: 20px;
            height: 20px;
            background-size: 16px 16px;
        `;

        const DecorLink=styled(Link)`
            float: right;
            font-style: italic;
            text-decoration: none;
            margin-top: 3px;
        `;

        const Div3=styled.div`
            background: linear-gradient(to top left, red, #ff65d8);
            width: ${()=>{
            return this.props.width+"%"}
            };
            margin-left: ${()=>{
            return (95-this.props.width)+"%"}
            };
            height: 30px;
            :hover {
                background: green;
            }
            ${document.location.href.includes("/"+this.props.title)}
                background: linear-gradient(to top left, red, #ff65d8);
            ${!document.location.href.includes("/"+this.props.title)}
                background: olive;
        `;

        const Button2=Button1.extend`
            float: right;
            background-size: 16px 16px;
            margin-top: 4px;
        `;

        const Button3=Button1.extend`
            float: right;
            background-size: 16px 16px;
            margin-top: 4px;
        `;

        const Button4=Button1.extend`
            ${this.props.subCategories.length!=0}
               &{
                  display: none;
               }
            background-size: 16px 16px;
        `;

        return (
            <Div3 className={this.props.title} id={this.props.visible}>
                <Button4 className="visibility" onClick={()=>{
                    if (this.count%2!=0){

                        this.props.makeVisibleSubCategory(this.props.title, "yes");
                        this.count=this.count+1;
                    }
                    if (document.getElementsByClassName(this.props.subCategories[0].title)[0].getAttribute("id")=="yes") {
                        this.props.makeUnvisibleSubCategory(this.props.title, "not");
                        this.count=this.count+1;
                    }
                }}></Button4>
                <Div4>
                    <DecorLink to={`/${this.props.title}`} >{this.props.title}</DecorLink>
                </Div4>
                <Button1 className="redact" onClick={()=>{
                    var titleCategory = prompt("Input the title of Category");
                    console.log(this.props.editCategory);
                    var example=this.props.title;
                    if (titleCategory){
                        this.props.editCategory(titleCategory, example);
                    }
                }}></Button1>
                <Button3 className="add_subCategory" onClick={()=>{
                    var example=this.props.title;
                    var event=1;
                    var titleCategory = prompt("Input the title of Category");
                    if (titleCategory) {
                        this.props.addSubCategory({title: titleCategory, subCategories: [], tasks: [], visible: "not"}, example);
                    }
                }}></Button3>
                <Button2 className="delete" onClick={()=>{
                    var example=this.props.title;
                    this.props.deleteCategory(example);
                }}></Button2>
            </Div3>
        );
    }
}

export default Category
