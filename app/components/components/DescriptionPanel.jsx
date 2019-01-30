import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom';

class DescriptionPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state={title: "", description: "", status: ""};
    }

    render() {
        const Button1=styled.button`
            float: right;
            margin-top: 30px;
            width: 150px;
            height: 30px;
            margin-right: 10px;
        `;

        const Button2=styled.button`
            float: right;
            margin-top: 30px;
            width: 70px;
            height: 30px;
            margin-right: 20px;
        `;

        const Input=styled.input`
            width: 200px;
            margin-top: 50px;
            margin-left: 20px;
        `;

        if (this.props.status=="done")
            var Input1=styled.input.attrs({checked: true})`
            margin-top: 20px;
            margin-left: 20px;
        `;

        else
            var Input1=styled.input.attrs({checked: false})`
                 margin-top: 20px;
                 margin-left: 20px; 
            `;



        const P=styled.p`
            display: inline;
        `;

        const TextArea=styled.textarea`
            width: 95%;
            height: 260px;
            border: 1px solid blue;
            margin-top: 20px;
            margin-left: 10px;
        `;

        const Div=styled.div`
            background: linear-gradient(to top left, red, #ff65d8);
            width: 55%;
            margin-right: 5%;
            float: right;
            margin-top: -515px;
            height: 512px;
        `;
        console.log(this.props.title);
        var long=this.props.title.length;
        console.log(long);
        console.log(this.props.match.url);
        var str=this.props.match.url.split('');
        str.splice(0, 1);
        str=str.join("");
        console.log(str);
        return (
            <Div>
                <Button2 onClick={()=>{this.props.history.push(`/${str}`);}}>Cansel</Button2>
                <Button1 onClick={()=>{
                    var event=1;

                    var oldTitleCategory=str;
                    var newTitleCategory="";
                    if (document.getElementsByClassName("target")[0].getAttribute("id")=="") {
                        newTitleCategory=oldTitleCategory;
                    }
                    else {
                        newTitleCategory=document.getElementsByClassName("target")[0].getAttribute("id");
                    }
                    var description=this.props.description;
                    if (document.newSituation.area.value) {
                        description=this.input2.value;
                    }
                    var oldTitle=this.props.title;
                    console.log("innerRef="+this.input.value);

                    var title=(this.input.value || oldTitle);
                    var status=(this.refs.checkbox.checked ? "done" : "unfinished");
                    console.log("title="+title);
                    console.log(this.props);
                    this.props.history.push(`/${str}`);
                    this.props.editTask(oldTitle, {title: title, Description: description, status: status}, oldTitleCategory, newTitleCategory);

                }} >Saved changes</Button1>
                <form name="newSituation">
                    <Input type="text" innerRef={x => { this.input = x }} className="target" id="" name="text1" />
                    <div>
                        <input name="checkbox" type="checkbox" ref="checkbox" />
                        <P>Done</P>
                    </div>
                    <TextArea name="area" innerRef={x => { this.input2 = x }}  placeholder={this.props.description} />
                </form>
            </Div>
        );
    }
}

export default DescriptionPanel