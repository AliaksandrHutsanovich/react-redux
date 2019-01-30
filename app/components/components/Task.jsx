import React from 'react'
import styled from 'styled-components'
import EditTask from './EditTask.jsx'
import {Link, Route} from 'react-router-dom';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state={title: "", Description: "", status: ""};
    }

    render() {
        const Div3=styled.div`
            background: linear-gradient(to top left, rgb(255, 215, 0), rgb(255, 255, 224));
            width: 95%;
            height: 70px;
        `;

        const P2=styled.div`
            display: inline-block;
            margin-top: 10px;
            margin-left: 20px;
        `;

        const P1=styled.p`
            display: inline-block;
            margin-left: 20px;
        `;

        const Button=styled(Link)`
            float: right;
            width: 20px;
            height: 20px;
            background-size: 16px 16px;
            margin-top: 20px;
            margin-right: 20px;
        `;

        console.log(this.props);
        if (this.props.status=="done")
            var Input=styled.input.attrs({checked: true})``;

        if (this.props.status=="unfinished")
            var Input=styled.input.attrs({checked: false})``;
            var prop=this.props;

        return (
            <div>
                <Div3>
                    <P2>
                        <Input type="checkbox" ref="box" />
                        <P1>{this.props.title}</P1>
                    </P2>
                    <Button className="edit-task" to={`${this.props.match.url}/${this.props.title}`}></Button>
                </Div3>
                <Route exact path={`${this.props.match.url}/${this.props.title}`} render={(props)=><EditTask {...props} {...prop} title={this.props.title} description={this.props.Description} status={this.props.status}/>}/>
            </div>
        );
    }
}

export default Task