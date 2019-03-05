import React from 'react';
import 'antd/dist/antd.css';
import '../styles/styles.css';
import { Progress } from 'antd';
import { Layout } from 'antd';
import HeaderContent from './header/headerContent';
import LayoutSiderContent from './layout/layoutSider/layoutSiderContent';
import LayoutContent from './layout/layoutContent/layoutContent';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTasks, getUrls } from './selectors/selectors';
import { createSelector } from 'reselect';


const {
    Header, Footer, Sider, Content,
  } = Layout;

class AppView extends React.Component {

    shouldComponentUpdate(nextProps) {
        return !(this.props.showDone === nextProps.showDone && 
                 this.props.searchKey === nextProps.searchKey && 
                 this.props.urls.length === nextProps.urls.length);
    }

    render() {
        console.log('Appview');
        let {taskGroups,showDone,searchKey,dispatch} = this.props;
        let routes = this.props.urls.map((url, index) => 
                               <Route 
                                  key={index} 
                                  path={`/${url}`} 
                                  render={(props) => { 
                                      return <LayoutContent {...props} url={url} showDone={showDone} searchKey={searchKey} />;
                                    }}
                                />);
        return (
            <BrowserRouter>
                <Layout className="wrapper">
                    <Header className="header">
                       <HeaderContent />
                    </Header>
                    <Layout className="wrapper__main" hasSider={true}>
                       <Sider className="wrapper__sider" width="30%">
                           <LayoutSiderContent />
                       </Sider>
                       <Content className="wrapper__content">
                           {routes}
                       </Content>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}

const urls = state => getUrls(state);
const showDone = state => state.filters.get('showDone');
const searchKey = state => state.filters.get('searchKey');

const urlSelector = createSelector(urls, url => url);
const showDoneSelector = createSelector(showDone, showDone => showDone);
const searchKeySelector = createSelector(searchKey, searchKey => searchKey);

const mapStateToProps = (state) => {
    return {
      urls: urlSelector(state),
      showDone: showDoneSelector(state),
      searchKey: searchKeySelector(state)
    }
}

export default connect(mapStateToProps)(AppView);
