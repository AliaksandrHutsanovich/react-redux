import React from 'react'
import styled from 'styled-components';



class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const Div=styled.div`
           background-color: white;
           height: 20px;
           border: 1px solid green;
           position: absolute;
           top: 50px;
           width: 98%;
        `;

        const Progress=styled.div`
           background-color: red;
           height: 100%;
           width: ${()=>{
               var path=document.location.href;
               var persent=0;
               var sum=0;
               var sumDone=0;
               var event=1;
               console.log(this.props);
               function searchTitle(sub) {
                   for (let i=0; i<sub.length; i++) {
                       if (event==2) break;
                       if (path.includes("/"+sub[i].title)) {
                           for (let j=0; j<sub[i].tasks.length; j++) {
                               sum=sum+1;
                               console.log("status="+sub[i].tasks[j].status);
                               if (sub[i].tasks[j].status=="done") {
                                   sumDone=sumDone+1;
                               }
                               persent=(sumDone/sum)*100;
                           }
                           event=2;
                       }
                       if (sub[i].subCategories.length!=0) {
                           searchTitle(sub[i].subCategories);
                       }
                   }
               }
               searchTitle(this.props.titlesCategories);
               return persent+"%";
           }};
        `;


        return (
            <Div>
                <Progress></Progress>
            </Div>
        )
    }
}

export default ProgressBar

