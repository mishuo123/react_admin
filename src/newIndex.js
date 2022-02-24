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
  return breadcrumb || {};
}

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
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


  state = {
    breadcrumb: null,
  };

  componentDidMount() {
    this.getBreadcrumbDom();
  }

  // componentDidUpdate() {
  //   this.getBreadcrumbDom();
  // }

  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  getBreadcrumbProps = () => {
    return {
      routes: this.props.routes || this.context.routes,
      params: this.props.params || this.context.params,
      routerLocation: this.props.location || this.context.location,
      breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
    };
  };

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb,
    });
  };

  // Generated according to props
  conversionFromProps = () => {
    const {
      breadcrumbList, breadcrumbSeparator, linkElement = 'a',
    } = this.props;

    return (
      <Breadcrumb
        className={styles.breadcrumb}
        separator={breadcrumbSeparator}
      >
        {breadcrumbList.map(item => (
          <Breadcrumb.Item key={item.title}>
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
    // Convert the url to an array
    const pathSnippets = urlToList(routerLocation.pathname);

    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      const isLinkable = (index !== pathSnippets.length - 1) && currentBreadcrumb.component;

      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
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


  // conversionBreadcrumbList = () => {
  //   const { breadcrumbList, breadcrumbSeparator} = this.props;
  //   const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();

  //   if (breadcrumbList && breadcrumbList.length) {
  //     return this.conversionFromProps();
  //   }
  //   // 如果传入 routes 和 params 属性
  //   // If pass routes and params attributes
  //   if (routes && params) {

  //     return (
  //       <Breadcrumb
  //         className={styles.breadcrumb}
  //         routes={routes.filter(route => route.breadcrumbName)}
  //         params={params}
  //         itemRender={this.itemRender}
  //         separator={breadcrumbSeparator}
  //       />
  //     );
  //   }
  //   // 根据 location 生成 面包屑
  //   // Generate breadcrumbs based on location
  //   if (location && location.pathname) {
  //     return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
  //   }
  //   return null;
  // }
  conversionBreadcrumbList = () => {
    const { breadcrumbList, breadcrumbSeparator } = this.props;
    const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
    if (breadcrumbList && breadcrumbList.length) {
      return this.conversionFromProps();
    }
    // 如果传入 routes 和 params 属性
    // If pass routes and params attributes
    if (routes && params) {
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
    if (routerLocation && routerLocation.pathname) {
      return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
    }
    return null;
  };


  // 渲染Breadcrumb 子节点
  // Render the Breadcrumb child node
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
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

    // const breadcrumb = this.conversionBreadcrumbList();
    const { breadcrumb } = this.state;

    return (
      <div className={clsString}>
        {breadcrumb}
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
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
