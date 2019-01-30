import React from 'react'
import styled from 'styled-components'
import Task from './Task.jsx'
import ProgressBar from './ProgressBar.jsx'

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state={tasks: (this.props.tasks || [])};
    }
    render() {
        console.log(this.props);
        var props=this.props;
        var tasks=this.state.tasks.map(task=>{
            return (
                <li>
                    <Task {...props} title={task.title} Description={task.Description} status={task.status} />
                </li>
            );
        });

        const Ul=styled.ul`
            background: linear-gradient(to top left, rgb(101, 208, 216), rgb(228, 255, 216));
            width: 60%;
            float: right;
            margin-top: -500px;
            height: 500px;
            overflow: auto;
            list-style-type: none;
        `;

        const Nav=styled.nav`
           margin-left: 70%;
           position: absolute;
           top: 10px;
        `;

        return (
            <div>
                <nav  className="checkbox">
                    <input type="checkbox" onClick={(e)=>{
                        var enable=e.target.checked;
                        var filteredList=this.props.tasks.filter(function(task){
                            if (enable) {
                                return task.status=="done";
                            }
                            else {
                                return true;
                            }
                        });
                        this.setState({tasks: filteredList});
                    }} />
                    Show done
                </nav>
                <input className="search-field" type="search" placeholder="search" size="30" onChange={(e)=>{
                    var filteredList = this.props.tasks.filter(function(task){
                        return task.title.toLowerCase().search(e.target.value.toLowerCase())!== -1;
                    });
                    this.setState({tasks: filteredList});
                }} />
                <ProgressBar {...this.props} />
                <Ul>
                    {tasks}
                </Ul>
            </div>
        );
    }
}

export default TaskList