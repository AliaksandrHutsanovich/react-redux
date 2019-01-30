import React from 'react';
import {Route} from 'react-router-dom';
import TaskList from './TaskList.jsx'

class WrapperDivRoute extends React.Component {
    render() {
        var routeCategories=[];
        var prop=this.props;
        function routeSubCategories(sub) {
            for (let i=0; i<sub.length; i++) {
                routeCategories.push(<Route path={`/${sub[i].title}`} render={(props)=><TaskList {...props} {...prop} tasks={sub[i].tasks}/>}/>);

                if (sub[i].subCategories.length!=0) {
                    routeSubCategories(sub[i].subCategories);
                }
            }
        }

        routeSubCategories(this.props.titlesCategories);

        return (
            <div>
                {routeCategories}
            </div>
        );
    }
}

export default WrapperDivRoute