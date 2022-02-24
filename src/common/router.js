/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-02 17:56:41
 * @Version: 1.0.0
 * @Description: 
 */
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';
import { createElement } from 'react';
import pathToRegexp from 'path-to-regexp';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter((model) => modelNotExisted(app, model)).map((m) => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return (props) =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache
          });
      });
    }
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['LoginUser/LoginUser'], () => import('../layouts/BasicLayout'))
    },

    //首页
    '/index': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/Index/Index')),
    },

    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout'))
    },

    //登录页面
    '/user/login': {
      component: dynamicWrapper(app, ['LoginUser/LoginUser'], () => import('../routes/LoginUser/LoginUser'))
    },
    // 个人中心
    "/personal": {
      component: dynamicWrapper(app, ['Index/Index', 'BusinessManage/BusinessManage'], () => import('../routes/Index/personal')),
      name: '个人中心'
    },

    //登录页面-忘记密码
    // '/user/ForgetPassword': {
    //   component: dynamicWrapper(app, ['LoginUser/LoginUser'], () => import('../routes/LoginUser/ForgetPassword'))
    // },

    //资源管理
    '/resManage': {
      component: dynamicWrapper(app, ['resManage'], () => import('../routes/ResourceManage/ResourceManage'))
    },

    //机构管理
    '/agencyManage/agencyList': {
      component: dynamicWrapper(app, ['BusinessManage/BusinessManage'], () => import('../routes/BusinessManage/BusinessManage')),
      name: '机构管理'
    },

    //机构用户管理
    '/agencyManage/agencyUserManage': {
      component: dynamicWrapper(app, ['BusinessManage/BusinessManage'], () => import('../routes/BusinessManage/BusinessManage')),
      name: '机构用户管理'
    },

    //商户管理
    '/merManage/merList': {
      component: dynamicWrapper(app, ['BusinessManage/BusinessManage'], () => import('../routes/BusinessManage/BusinessManage')),
      name: '商户管理'
    },

    //商户用户管理
    '/merManage/merUserManage': {
      component: dynamicWrapper(app, ['BusinessManage/BusinessManage'], () => import('../routes/BusinessManage/BusinessManage')),
      name: '商户用户管理'
    },
    //#endregion

    //商户产品管理
    '/merManage/businessUsers': {
      component: dynamicWrapper(app, ['BusinessManage/BusinessManage'], () => import('../routes/BusinessManage/BusinessManage')),
      name: '商户产品管理'
    },

    //渠道管理
    '/channelManage/channelList': {
      component: dynamicWrapper(app, ['BusinessManage/BusinessManage'], () => import('../routes/BusinessManage/BusinessManage')),
      name: '渠道管理'
    },

    //渠道用户管理
    '/channelManage/channelUserManage': {
      component: dynamicWrapper(app, ['BusinessManage/BusinessManage'], () => import('../routes/BusinessManage/BusinessManage')),
      name: '渠道用户管理'
    },

    //授权管理
    '/authorizeManage': {
      component: dynamicWrapper(app, ['authorize', 'authorizeList', 'role', 'roleUserList'], () => import('../routes/AuthorizeManage/Authorize')),
      name: '授权管理'
    },

    //角色管理
    '/roleManage/roleManage': {
      component: dynamicWrapper(app, ['role', 'roleUserList'], () => import('../routes/Role/RoleManage')),
      name: '角色管理'
    },


    //印章管理-列表
    '/stampControl/list': {
      component: dynamicWrapper(app, ['StampControl/StampControl'], () => import('../routes/StampControl/List')),
      name: '印章管理  /  电子印章列表'
    },

    //印章管理-查看
    '/stampControl/detail': {
      component: dynamicWrapper(app, ['StampControl/StampControl'], () => import('../routes/StampControl/Detail')),
      name: '印章管理  /  印章详情'
    },

    //印章管理-新增
    '/stampControl/add': {
      component: dynamicWrapper(app, ['StampControl/StampControl'], () => import('../routes/StampControl/Add')),
      name: '印章管理  /  新增电子印章'
    },


    //公证管理-发送
    '/notarizationManagement/list': {
      component: dynamicWrapper(app, ['NotarizationManagement/NotarizationManagement'], () => import('../routes/NotarizationManagement/List')),
      name: '公证管理 / 公证发起'
    },

    //公证管理-申请公证
    '/notarizationManagement/casePush': {
      component: dynamicWrapper(app, ['NotarizationManagement/NotarizationManagement'], () => import('../routes/NotarizationManagement/CasePush')),
      name: '公证管理 / 公证发起'
    },

    //公证管理确认-列表
    '/notarizationManagement/notarizationConfirmation': {
      component: dynamicWrapper(app, ['NotarizationManagement/NotarizationManagement'], () => import('../routes/NotarizationManagement/NotarizationConfirmation')),
      name: '公证管理 / 公证确认'
    },


    // //公证管理-发起 详情
    '/notarizationManagement/signatureSure': {
      component: dynamicWrapper(app, ['NotarizationManagement/NotarizationManagement'], () => import('../routes/NotarizationManagement/SignatureSure')),
      name: '公证管理 / 案件详情'
    },


    // //公证管理-确认
    '/notarizationManagement/pushSure': {
      component: dynamicWrapper(app, ['NotarizationManagement/NotarizationManagement'], () => import('../routes/NotarizationManagement/PushSure')),
      name: '公证管理 / 公证确认'
    },

    //档案管理-
    '/fileManagement/fileManagement': {
      component: dynamicWrapper(app, ['FileManagement/FileManagement'], () => import('../routes/FileManagement/FileManagement')),
      name: '档案管理 / 按签约人查看'
    },

    //档案管理-查看
    '/fileManagement/detail': {
      component: dynamicWrapper(app, ['FileManagement/FileManagement'], () => import('../routes/FileManagement/Detail')),
      name: '档案管理 / 案件详情'
    },

    //模板管理
    // '/templateManage': {
    //   component: dynamicWrapper(app, ['TemplateManage/TemplateManage'], () => import('../routes/TemplateManage/List'))
    // },

    //模板管理-列表
    '/templateManage/list': {
      component: dynamicWrapper(app, ['TemplateManage/TemplateManage', 'CaseManage/CaseManage'], () => import('../routes/TemplateManage/List')),
      name: '模板管理'
    },

    //模板管理-查看
    '/templateManage/detail': {
      component: dynamicWrapper(app, ['TemplateManage/TemplateManage', 'CaseManage/CaseManage'], () => import('../routes/TemplateManage/Detail')),
      name: '模板管理'
    },

    //案例管理-推送-列表
    '/caseManage/list': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/List')),
      name: '案件管理 / 案件推送'
    },

    //案例管理-推送-详情
    '/caseManage/detail': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage', 'NotarizationManagement/NotarizationManagement'], () => import('../routes/CaseManage/Detail')),
      name: '案件管理 / 案件详情'
    },

    //案例管理-模板推送下一步
    '/caseManage/templateInitiatedPush': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/TemplateInitiatedPush')),
      name: '案件管理 / 推送发起'
    },

    //案例管理-模板推送下一步
    '/caseManage/addSubjectsFormTable': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/AddSubjectsFormTable')),
      name: '案件管理 / 推送发起'
    },

    //案例管理-模板推送下一步
    '/caseManage/caseLoan': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/CaseLoan')),
      name: '案件管理 / 推送发起'
    },

    //案例管理-模板推送下一步
    '/caseManage/casePush': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/CasePush')),
      name: '案件管理 / 推送发起'
    },

    //案例管理-模板推送下一步
    '/caseManage/pushSure': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/PushSure')),
      name: '案件管理 / 推送确认'
    },

    //案例管理-签署
    '/caseManage/signatureList': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/SignatureList')),
      name: '案件管理 / 案件签署'
    },

    //案例管理-签署
    '/caseManage/signatureSure': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/SignatureSure')),
      name: '案件管理 / 案件签署'
    },

    //案例管理-签署
    '/caseManage/need': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/Need')),
      name: '案件管理 / 推送发起'
    },

    //案件管理-查看上传资料
    '/caseManage/checkFile': {
      component: dynamicWrapper(app, ['CaseManage/CaseManage'], () => import('../routes/CaseManage/CheckFile')),
      name: '案件管理 / 查看资料'
    },

    //司法催收管理-司法催收管理列表
    '/JudicalCollectionManage/judicalCollectionList': {
      component: dynamicWrapper(app, [], () => import('../routes/JudicalCollectionManage/JudicalCollectionList')),
      name: '司法催收管理  /  催收管理列表'
    },

    //司法催收管理-催收管理
    '/JudicalCollectionManage/CollectionManage': {
      component: dynamicWrapper(app, [], () => import('../routes/JudicalCollectionManage/CollectionManage')),
      name: '司法催收管理  /  催收管理'
    },

    //司法催收管理-催收详情
    '/JudicalCollectionManage/JudicalCollectionDetail': {
      component: dynamicWrapper(app, [], () => import('../routes/JudicalCollectionManage/JudicalCollectionDetail')),
      name: '司法催收管理  /  催收详情'
    },

    //实名管理-实名认证管理列表
    '/AutonymManage/autonymManageList': {
      component: dynamicWrapper(app, ['AutonymManage/AutonymManage'], () => import('../routes/AutonymManage/AutonymManageList')),
      name: '实名认证  /  实名认证列表'
    },

    //实名管理-实名认证管理详情
    '/AutonymManage/autonymManageDetail': {
      component: dynamicWrapper(app, ['AutonymManage/AutonymManage'], () => import('../routes/AutonymManage/AutonymManageDetail')),
      name: '实名认证  /  实名认证详情'
    },

    //赋强交易-赋强交易管理列表
    '/BestowStrongTrans/bestowStrongTransList': {
      component: dynamicWrapper(app, ['BestowStrongTrans/BestowStrongTrans'], () => import('../routes/BestowStrongTrans/BestowStrongTransList')),
      name: '案件管理  /  案件列表'
    },

    //赋强在线视频-赋强赋强交易列表交易管理列表
    '/OnlineVideo/OnlineVideo': {
      component: dynamicWrapper(app, ['BestowStrongTrans/BestowStrongTrans'], () => import('../routes/OnlineVideo/OnlineVideo')),
      name: '在线视频  /  在线视频'
    },

    //赋强交易-赋强交易管理详情
    '/BestowStrongTrans/bestowStrongTransDetail': {
      component: dynamicWrapper(app, ['BestowStrongTrans/BestowStrongTrans'], () => import('../routes/BestowStrongTrans/BestowStrongTransDetail')),
      name: '案件管理  /  案件详情'
    },

    //赋强在线视频-赋强交易管理详情
    '/OnlineVideo/OnlineVideoDetail': {
      component: dynamicWrapper(app, ['BestowStrongTrans/BestowStrongTrans'], () => import('../routes/OnlineVideo/OnlineVideoDetail')),
      name: '在线视频  /  在线视频详情'
    },

    //线下录入
    '/InputUser/InputUser': {
      component: dynamicWrapper(app, ['BestowStrongTrans/BestowStrongTrans'], () => import('../routes/InputUser/InputUser')),
      name: '线下录入/  线下录入'
    },
    // 线下录入- 查看详情
    '/InputUser/checkDetail': {
      component: dynamicWrapper(app, ['BestowStrongTrans/BestowStrongTrans'], () => import('../routes/InputUser/checkDetail')),
      name: '线下录入/ 查看详情'
    },



    //  录入用户信息
    '/InputUser/userDetail': {
      component: dynamicWrapper(app, ['BestowStrongTrans/BestowStrongTrans'], () => import('../routes/InputUser/userDetail')),
      name: '线下录入/  录入用户信息'
    },



    //强执管理-导入强执数据
    '/CompulsoryManage/uploadCompulsoryList': {
      component: dynamicWrapper(app, ['CompulsoryManage/CompulsoryManage'], () => import('../routes/CompulsoryManage/UploadCompulsoryList')),
      name: '强执管理  /  导入强执数据'
    },

    //强执管理-强执管理列表
    '/CompulsoryManage/compulsoryManageList': {
      component: dynamicWrapper(app, ['CompulsoryManage/CompulsoryManage'], () => import('../routes/CompulsoryManage/CompulsoryManageList')),
      name: '强执管理  /  强执管理列表'
    },

    //强执管理-强执管理详情
    '/CompulsoryManage/compulsoryManageDetail': {
      component: dynamicWrapper(app, ['CompulsoryManage/CompulsoryManage'], () => import('../routes/CompulsoryManage/CompulsoryManageDetail')),
      name: '强执管理  /  强执管理详情'
    },

  };

  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find((key) => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority
    };
    routerData[path] = router;
  });
  return routerData;
};
