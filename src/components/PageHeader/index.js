/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 16:16:19
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { Breadcrumb } from 'antd';
import classNames from 'classnames';
import styles from './index.less';


export function getBreadcrumb(breadcrumbNameMap, url) {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  // console.log(28,breadcrumbNameMap,18.1,url,15.2,breadcrumb)
  return breadcrumb || {};
}

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url) {
  console.log(url);
  const urllist = url.split('/').filter(i => i);
  // console.log(35,urllist);
  return urllist.map((urlItem, index) => {
    // console.log(37,urllist,urlItem,index);
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

export default class PageHeader extends PureComponent {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  getBreadcrumbProps = () => {
    // console.log(55, this.props, this.context);

    return {
      routes: this.props.routes || this.context.routes,
      params: this.props.params || this.context.params,
      routerLocation: this.props.location || this.context.location,
      breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
    };
  };
  // Generated according to props
  conversionFromProps = () => {
    const {
      breadcrumbList, breadcrumbSeparator, linkElement = 'a',
    } = this.props;
    // console.log(67,this.props,67.1,breadcrumbList)
    return (
      <Breadcrumb
        className={styles.breadcrumb}
        separator={breadcrumbSeparator}
      >
        {breadcrumbList.map(item => (
          <Breadcrumb.Item key={item.title}>
            {console.log(75, item)}
            {/* {item.href ? (createElement(linkElement, {
          [linkElement === 'a' ? 'href' : 'to']: item.href,
        }, item.title)) : item.title} */}
            {item.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
  conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
    const { breadcrumbSeparator, linkElement = 'a' } = this.props;
    const pathSnippets = urlToList(routerLocation.pathname);
    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      let currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);

      // console.log(96,pathSnippets,96.1,routerLocation.pathname,96.2,breadcrumbNameMap,96.3,url)
      const isLinkable = (index !== pathSnippets.length - 1) && currentBreadcrumb.component;
      // if(url === "/caseManage/templateInitiatedPush" ||url === "/caseManage/addSubjectsFormTable" || url === "/caseManage/casePush" || url === "/caseManage/need" || url === "/caseManage/pushSure" || url === "/caseManage/detail"){
      //   currentBreadcrumb.name ="案件推送";
      // }else if(url === "/caseManage/signatureSure"){
      //   currentBreadcrumb.name ="案件签署";
      // }else if(url === "/notarizationManagement/casePush" || url === "/notarizationManagement/signatureSure"){
      //   currentBreadcrumb.name ="公证发送";
      // }else if(url === "/notarizationManagement/PushSure"){
      //   currentBreadcrumb.name ="公证确认";
      // }else if(url=== "/fileManagement/detail"){
      //   currentBreadcrumb.name ="档案管理";
      // }else if(url === "/templateManage/detail"){
      //   currentBreadcrumb.name ="模板管理";
      // }else if(url === "/stampControl/detail"){
      //   currentBreadcrumb.name ="印章管理";
      // }


      // console.log(83,currentBreadcrumb,currentBreadcrumb.name)

      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {/* {console.log(119,currentBreadcrumb.name,1191.1,url)} */}
          {/* {createElement(
            isLinkable ? linkElement : 'span',
            { [linkElement === 'a' ? 'href' : 'to']: url },
            currentBreadcrumb.name,
          )} */}
          {currentBreadcrumb.name}
        </Breadcrumb.Item>
      ) : null;
    });
    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {/* {createElement(linkElement, {
        [linkElement === 'a' ? 'href' : 'to']: '/' }, '首页')} */}
        首页
      </Breadcrumb.Item>
    );
    // console.log(103,urlToList(routerLocation.pathname),extraBreadcrumbItems)
    return (
      <Breadcrumb
        className={styles.breadcrumb}
        separator={breadcrumbSeparator}
      >
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  }
  /**
   * 将参数转化为面包屑
   * Convert parameters into breadcrumbs
   */
  conversionBreadcrumbList = () => {
    const { breadcrumbList, breadcrumbSeparator } = this.props;
    const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
    // console.log(120,breadcrumbNameMap )
    if (breadcrumbList && breadcrumbList.length) {
      return this.conversionFromProps();
    }
    // 如果传入 routes 和 params 属性
    // If pass routes and params attributes
    if (routes && params) {
      // console.log(127,routes,params)
      return (
        <Breadcrumb
          className={styles.breadcrumb}
          routes={routes.filter(route => route.breadcrumbName)}
          params={params}
          itemRender={this.itemRender}
          separator={breadcrumbSeparator}
        />
      );
    }
    // 根据 location 生成 面包屑
    // Generate breadcrumbs based on location
    if (location && location.pathname) {
      return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
    }
    return null;
  }
  // 渲染Breadcrumb 子节点
  // Render the Breadcrumb child node
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
    // console.log(150, route, params, routes, paths, last)
    return route.breadcrumbName;
    // return (last || !route.component)
    //   ? <span>{route.breadcrumbName}</span>
    //   : createElement(linkElement, {
    //     href: paths.join('/') || '/',
    //     to: paths.join('/') || '/',
    //   }, route.breadcrumbName);
  }

  render() {
    const {
      title, logo, action, content, extraContent,
      className,
    } = this.props;
    const clsString = classNames(styles.pageHeader, className);

    const breadcrumb = this.conversionBreadcrumbList();

    // console.log(189,breadcrumb)
    return (
      <div className={clsString}>
        {breadcrumb}
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {/* {action && <div className={styles.action}>{action}</div>} */}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
