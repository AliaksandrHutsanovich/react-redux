/*
  eslint react/no-array-index-key: 0,
  react/jsx-boolean-value: 0,
  no-shadow: 0
*/

import React from 'react';
import 'antd/dist/antd.css';
import '../styles/styles.css';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import HeaderContent from './header/headerContent';
import LayoutSiderContent from './layout/layoutSider/layoutSiderContent';
import LayoutContent from './layout/layoutContent/layoutContent';

import { getUrls } from './selectors/selectors';

const {
    Header, Sider, Content,
  } = Layout;

class AppView extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      showDone,
      searchKey,
      urls: {
        length,
      },
    } = this.props;
    return !(showDone === nextProps.showDone
      && searchKey === nextProps.searchKey
      && length === nextProps.urls.length);
    }

    render() {
      const { showDone, searchKey, urls } = this.props;
      const routes = urls.map((url, index) => (
        <Route
          key={index}
          path={`/${url}`}
          render={(props) => (
            <LayoutContent {...props} url={url} showDone={showDone} searchKey={searchKey} />
          )}
        />
      ));
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

const urls = (state) => getUrls(state);
const showDone = (state) => state.filters.get('showDone');
const searchKey = (state) => state.filters.get('searchKey');

const urlSelector = createSelector(urls, (url) => url);
const showDoneSelector = createSelector(showDone, (showDone) => showDone);
const searchKeySelector = createSelector(searchKey, (searchKey) => searchKey);

const mapStateToProps = (state) => ({
  urls: urlSelector(state),
  showDone: showDoneSelector(state),
  searchKey: searchKeySelector(state),
});

AppView.defaultProps = {
  searchKey: '',
};

AppView.propTypes = {
  showDone: PropTypes.bool.isRequired,
  searchKey: PropTypes.string,
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(AppView);
