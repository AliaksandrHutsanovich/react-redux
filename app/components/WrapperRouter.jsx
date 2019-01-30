import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import WrapperDiv from './components/WrapperDiv.jsx';
import WrapperDivRoute from './components/WrapperDivRoute.jsx';

class WrapperRouter extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <WrapperDiv {...this.props} />
                    <WrapperDivRoute {...this.props} />
                </div>
            </Router>
        );
    }
}

export default WrapperRouter