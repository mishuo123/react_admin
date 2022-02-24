import { isUrl } from "../utils/utils";

const menuData = [
  {
    name: "资源管理",
    icon: "appstore-o",
    path: "resManage/resList",
  },
  {
    name: "机构管理",
    icon: "appstore-o",
    path: "agencyManage",
    children: [
      {
        name: "机构列表",
        icon: "bars",
        path: "agencyList",
      },
      {
        name: "机构用户管理",
        icon: "bars",
        path: "agencyUserManage",
      },
    ],
  },
  {
    name: "商户管理",
    icon: "appstore-o",
    path: "merManage",
    children: [
      {
        name: "商户列表",
        icon: "bars",
        path: "merList",
      },
      {
        name: "商户用户管理",
        icon: "bars",
        path: "merUserManage",
      },
    ],
  },
  {
    name: "授权管理",
    icon: "profile",
    path: "authorize",
  },
  {
    name: "角色管理",
    icon: "usergroup-add",
    path: "roleManage/roleList",
  },
  {
    name: "数据统计",
    icon: "appstore-o",
    path: "dataStatistics",
    children: [
      {
        name: "数据统计",
        icon: "bars",
        path: "dataStatistics",
      },
    ],
  },
  {
    name: "公证管理",
    icon: "appstore-o",
    path: "notarizationManagement",
    children: [
      {
        name: "公证发起",
        icon: "bars",
        path: "list",
      },
      {
        name: "公证发起",
        icon: "bars",
        path: "casePush",
        hideInBreadcrumb: true,
        hideInMenu: true,
      },
      {
        name: "公证确认",
        icon: "bars",
        path: "notarizationConfirmation",
      },
    ],
  },
  {
    name: "档案管理",
    icon: "appstore-o",
    path: "fileManagement",
    children: [
      {
        name: "档案管理",
        icon: "bars",
        path: "fileManagement",
      },
    ],
  },
  {
    name: "模板管理",
    icon: "appstore-o",
    path: "templateManage",
    children: [
      {
        name: "模板管理列表",
        icon: "bars",
        path: "list",
      },
      // {
      //   name: '模板新增查看',
      //   icon: 'bars',
      //   path: 'detail',
      // },
    ],
  },
  {
    name: "印章管理",
    icon: "appstore-o",
    path: "stampControl",
    children: [
      {
        name: "电子印章列表",
        icon: "bars",
        path: "list",
      },
      // {
      //   name: '印章新增查看',
      //   icon: 'bars',
      //   path: 'detail',
      // },
    ],
  },
  {
    name: "案件推送/签署",
    icon: "appstore-o",
    path: "caseManage",
    children: [
      {
        name: "案件推送",
        icon: "bars",
        path: "list",
      },
      {
        name: "案件签署",
        icon: "bars",
        path: "signatureList",
      },
    ],
  },
];

function formatter(data, parentPath = "", parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData); //本地
export const getMyMenu = (myMenuData) => formatter(myMenuData); //服务器
