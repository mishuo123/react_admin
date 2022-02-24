/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 16:15:08
 * @Version: 1.0.0
 * @Description:
 */
import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import { Layout } from "antd";
import classNames from "classnames";
import MenuData from "../routes/Menu/Menu";
import { getRoutes } from "../utils/utils";
import Authorized from "../utils/Authorized";
import NotFound from "../routes/Exception/404";
import SiderMenu from "../components/SiderMenu";
import DocumentTitle from "react-document-title";
import GlobalHeader from "../components/GlobalHeader";
import Logo from "../assets/logoSmall.png";
import { ContainerQuery } from "react-container-query";
import { getMenuData, getMyMenu } from "../common/menu";
import { Redirect, Route, Switch, routerRedux } from "dva/router";

const { Content, Header } = Layout;
const { AuthorizedRoute } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */

const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};

getMenuData().forEach(getRedirect);

const query = {
  "screen-xs": {
    maxWidth: 575,
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767,
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991,
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199,
  },
  "screen-xl": {
    minWidth: 1200,
  },
};

@MenuData
class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  state = {};

  // componentWillMount() {
  //   sessionStorage.width = 276;
  // }

  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }

  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: "LoginUser/changeLayoutCollapsed",
      payload: collapsed,
    });
  };

  // 退出登录
  click = ({ key }) => {
    sessionStorage.clear();
    this.props.dispatch(routerRedux.push("/user/login"));
  };

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    // console.log(104,pathname);
    if (pathname === "/DeployManage/ApprovalProcess") {
      // window.open('http://actwf.handydata.cn/activiti-explorer')
      window.open("https://zjsign01.zjnotary.com/activiti-explorer");
    }
    let title = "在线调解管理平台";
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 在线调解管理平台`;
    }
    return title;
  }

  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get("redirect");
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete("redirect");
      window.history.replaceState(null, "redirect", urlParams.href);
    } else {
      //return '/index';
      return "/user/login";
    }
    return redirect;
  };

  render() {
    const { collapsed, routerData, match, location, menus } = this.props;
    // console.log(131,menus)
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout>
        <SiderMenu
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          //本地
          // menuData={getMenuData()}
          //服务器
          menuData={getMyMenu(menus)}
          collapsed={collapsed}
          onCollapse={this.handleMenuCollapse}
          location={location}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            {/* <img alt="logo" src={Logo} style={{position: 'absolute',width: 206, height:100, zIndex: 99, top: 0, right: 100}} /> */}
            <GlobalHeader
              currentUser={{
                name: sessionStorage.userName,
                avatar: "https://static.zcool.cn/git_z/z/images/boy.png",
              }}
              collapsed={collapsed}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.click}
            />
          </Header>
          <Content>
            <Switch>
              {redirectData.map((item) => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map((item) => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  authority={item.authority}
                  redirectPath="/exception/403"
                />
              ))}
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {(params) => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, LoginUser, loading }) => ({
  collapsed: LoginUser.collapsed,
  LoginUser,
}))(BasicLayout);
