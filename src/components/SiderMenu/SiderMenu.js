/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2020-07-23 19:01:17
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'dva/router';
import styles from './index.less';
import Logo from '../../../src/assets/logoSmall.png';

const { Sider } = Layout;
const { SubMenu } = Menu;
const style = {
  'fontSize': 14,
  'paddingRight': 10,
  'transition': 'fontSize 0.15s cubicBezier(0.215, 0.61, 0.355, 1), margin 0.3s cubicbezier(0.645, 0.045, 0.355, 1)',
}
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  // if (typeof icon === 'string') {
  //   return <Icon type={icon} />;
  // }
  if (typeof icon === 'string') {
    return <span className={`iconfont ${icon}`} style={style}></span>;
  }
  return icon;
};

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    // eg. /list/search/articles = > ['','list','search','articles']
    let snippets = pathname.split('/');
    // Delete the end
    // eg.  delete 'articles'
    snippets.pop();
    // Delete the head
    // eg. delete ''
    snippets.shift();
    // eg. After the operation is completed, the array should be ['list','search']
    // eg. Forward the array as ['list','list/search']
    snippets = snippets.map((item, index) => {
      // If the array length > 1
      if (index > 0) {
        // eg. search => ['list','search'].join('/')
        return snippets.slice(0, index + 1).join('/');
      }
      // index 0 to not do anything
      return item;
    });
    snippets = snippets.map((item) => {
      return this.getSelectedMenuKeys(`/${item}`)[0];
    });
    // eg. ['list','list/search']
    return snippets;
  }
  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  }
  /**
   * Get selected child nodes
   * /user/chen => ['user','/user/:id']
   */
  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.menus);
    // console.log(94,this.menus,94.1,flatMenuKeys)
    return flatMenuKeys.filter((item) => {
      // console.log(96,item,96.1,flatMenuKeys)
      return pathToRegexp(`/${item}(.*)`).test(path);
    });
  }
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}<span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={this.props.isMobile ? () => { this.props.onCollapse(true); } : undefined}
      >
        {icon}<span>{name}</span>
      </Link>
    );
  }
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {

    if (item.children && item.children.some(child => child.name)) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : item.name
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.path} name={item.name}>
          {this.getMenuItemPath(item)}
        </Menu.Item>
      );
    }
  }
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => !!item);
  }
  // conversion Path
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  }
  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(
        authority,
        ItemDom
      );
    }
    return ItemDom;
  }
  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  }
  render() {
    const { collapsed, location: { pathname }, onCollapse, menuData } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      openKeys,
    };

    this.menus = menuData;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    };
    if (pathname === "/caseManage/templateInitiatedPush" || pathname === "/caseManage/addSubjectsFormTable" || pathname === "/caseManage/casePush" || pathname === "/caseManage/need" || pathname === "/caseManage/pushSure" || pathname === "/caseManage/detail") {
      selectedKeys = ["caseManage", "caseManage/list"];
    } else if (pathname === "/caseManage/signatureSure") {
      selectedKeys = ["caseManage", "caseManage/signatureList"];
    } else if (pathname === "/notarizationManagement/casePush" || pathname === "/notarizationManagement/signatureSure") {
      selectedKeys = ["notarizationManagement", "notarizationManagement/list"];
    } else if (pathname === "/notarizationManagement/PushSure") {
      selectedKeys = ["notarizationManagement", "notarizationManagement/notarizationConfirmation"];
    } else if (pathname === "/fileManagement/detail") {
      selectedKeys = ["fileManagement", "fileManagement/fileManagement"];
    } else if (pathname === "/templateManage/detail") {
      selectedKeys = ["templateManage", "templateManage/list"];
    }
    // else if(pathname === "/stampControl/detail"){
    //   selectedKeys =["stampControl", "stampControl/list"];
    // }

    const id = location.href.split("=")[1];
    if (location.href) {
      if (id) {
        if (pathname === "/stampControl/detail") {
          selectedKeys = ["stampControl", "stampControl/list"];
        }
      }
    }

    return (

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={208}
        className={styles.sider}
      >

        <div key="logo">
          <Link to="/index">
            {/* <div style={{padding: '0 24px', background: '#fff'}}><img alt="logo"  src={Logo} width="100%"/></div> */}
            <h1 style={{ paddingLeft: 24, color: '#fff', fontSize: 18, margin: '10px 0' }}>{collapsed ? "" : "在线调解管理平台"}</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>

        <Spin spinning={this.menus.length ? false : true} style={{ width: '100%', textAlign: 'center' }}></Spin>
      </Sider>
    );
  }
}
