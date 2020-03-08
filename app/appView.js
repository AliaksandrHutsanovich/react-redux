/*
  eslint react/no-array-index-key: 0,
  react/jsx-boolean-value: 0,
  no-shadow: 0
*/

import React from 'react';
import '!style-loader!css-loader!antd/dist/antd.css'; // eslint-disable-line
import '!style-loader!css-loader!../styles/styles.css'; // eslint-disable-line
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderContent from './header';
import { LayoutSiderContent, LayoutContent, Map } from './layout';

import { getUrls } from './selectors';
import styles from './appView.css';

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
      isDisplayed,
    } = this.props;
    return !(showDone === nextProps.showDone
      && searchKey === nextProps.searchKey
      && length === nextProps.urls.length
      && isDisplayed === nextProps.isDisplayed);
    }

    render() {
      const {
        showDone,
        searchKey,
        urls,
        isDisplayed,
      } = this.props;
      const routes = urls.map((url, index) => (
        <Route
          key={index}
          path={`/${url}`}
          render={(props) => (
            <LayoutContent
              {...props}
              url={url}
              showDone={showDone}
              searchKey={searchKey}
              isDisplayed={isDisplayed}
            />
          )}
        />
      ));
      return (
        <BrowserRouter>
          <Layout className={styles.wrapper}>
            <Header className={styles.header}>
              <HeaderContent />
            </Header>
            <Layout className={styles.wrapperMain} hasSider={true}>
              <Sider className={styles.wrapperSider} width="30%">
                <LayoutSiderContent />
              </Sider>
              <Content>
                <Map />
                {routes}
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      );
    }
}

const mapStateToProps = ({ contentDisplay, filters, ...state }) => ({
  urls: getUrls(state),
  showDone: filters.get('showDone'),
  searchKey: filters.get('searchKey'),
  isDisplayed: contentDisplay.get('isDisplayed'),
});

AppView.defaultProps = {
  searchKey: '',
};

AppView.propTypes = {
  showDone: PropTypes.bool.isRequired,
  searchKey: PropTypes.string,
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDisplayed: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AppView);
