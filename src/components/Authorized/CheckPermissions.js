import React from 'react';
import PromiseRender from './PromiseRender';
import {CURRENT} from './index';

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;

  if (!authority) {
    return target;
  }

  for (let i = 0; i < authority.length; i++) {
    if (authority[i].isShow === 'true' && authority[i].type === 'control') {
      return target;
    }
  }

  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target;
    }
    return Exception;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority}/>;
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }

  throw new Error('unsupported parameters');
};

/**
 *
 * @param path      //父组件path
 * @param itemPath  //子组件path
 */
export const myCheckPermissions = (path, itemPath, childrenPath) => {
  if (sessionStorage.menuData) {
    const data = JSON.parse(sessionStorage.menuData);
    for (let i = 0; i < data.length; i++) {
      if (path === data[i].path) {
        let item = data[i].children;
        if (!item) {
          return [{
            'isShow': 'false',
            'type': 'control',
          }];
        }
        for (let j = 0; j < item.length; j++) {
          if (itemPath === item[j].path) {
            let childrenItem = item[j].children;
            if (!childrenItem) {
              return [{
                'isShow': 'false',
                'type': 'control',
              }];
            }
            for (let k = 0; k < childrenItem.length; k++) {
              if (childrenPath === childrenItem[k].path) {
                return [{
                  'isShow': 'true',
                  'type': 'control',
                }];
              }
            }
          }
        }
      }
    }
  }
  return [{
    'isShow': 'false',
    'type': 'control',
  }];
}

// const getChildren = (item) => {
//   // console.log("item", item);
// }

export {checkPermissions};

const check = (authority, target, Exception) => {
  return checkPermissions(authority, CURRENT, target, Exception);
};

export default check;
