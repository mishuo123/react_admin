/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-06 12:37:59
 * @Version: 1.0.0
 * @Description: 
 */

import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import logo from '../assets/logoSmall.png';
import styles from './UserLayout.less';

import { getRoutes } from '../utils/utils';


class UserLayout extends React.PureComponent {

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '在线调解管理平台';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 在线调解管理平台`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/index">
                  {/* <img alt="logo" src={logo} style={{position: 'absolute', top: 8, left: 8, width:206, height:110}}/> */}
                  <span className={styles.title}>在线调解管理平台</span>
                </Link>
              </div>
              {/*<div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>*/}
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
              )}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          {/* <GlobalFooter links={links} copyright={copyright}/> */}
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
