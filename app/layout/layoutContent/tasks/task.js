import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import CardTitle from './cardTitle';
import { Collapse } from 'antd';
import pure from 'recompose/pure';

const Panel = Collapse.Panel;

// class Task extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         console.log('rendering tasks');
//         let { title, description, isFinished, index, url } = this.props;
//         return (
//             <Card className="list-item__content" title={<CardTitle index={index} url={url} title={title} isFinished={isFinished} description={description} />}>
//                 <Collapse bordered={false}>
//                     <Panel header="Card content">
//                         <p>{description}</p>
//                     </Panel>
//                 </Collapse>
//             </Card>
//         );
//     }
// }

const Task = ({title, description, isFinished, index, url}) => {
    return  <Card className="list-item__content" title={<CardTitle index={index} url={url} title={title} isFinished={isFinished} description={description} />}>
               <Collapse bordered={false}>
                   <Panel header="Card content">
                       <p>{description}</p>
                   </Panel>
               </Collapse>
            </Card>
};

export default pure(Task);