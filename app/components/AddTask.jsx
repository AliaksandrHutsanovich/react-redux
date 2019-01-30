import React from 'react'
import styled from 'styled-components'

const Div2=styled.div`
    margin-left: 70%;
    margin-top: -22px;
`;

const Form=styled.form`
           display: inline;
        `;

const AddTask=(props)=>(
    <Div2>
        <Form name="newTask">
            <input type="text" name="Task1" placeholder="Add new task" />
        </Form>
        <button onClick={()=>{
            var newTask=document.newTask.Task1.value;
            if (newTask!="") {
                newTask={title: newTask, Description: "", status: "unfinished"};
                var subPath=document.location.href.slice(22);
                console.log(props);
                props.addTask(newTask, subPath);
            }
        }}>Add</button>
    </Div2>
)

export default AddTask