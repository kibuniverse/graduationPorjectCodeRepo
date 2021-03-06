import React from 'react';
import {
  IconGift,
  IconUser,
  IconList,
  IconCalendarClock,
  IconMessage,
  IconVideoCamera,
} from '@arco-design/web-react/icon';

export const defaultRoute = 'welcome';

export const routes = [
  {
    name: 'menu.welcome',
    key: 'welcome',
    icon: <IconGift />,
    componentPath: 'welcome',
  },
  {
    name: '个人信息',
    key: 'personal-info',
    icon: <IconUser />,
    componentPath: 'personal-info',
  },
  {
    name: '预约会议',
    key: 'meeting',
    icon: <IconCalendarClock />,
    componentPath: 'meeting',
  },
  {
    name: '会议详情',
    key: 'meeting-list/detail',
    componentPath: 'meeting-list/detail',
    notInMenu: true,
  },
  {
    name: '会议列表',
    key: 'meeting-list',
    icon: <IconList />,
    componentPath: 'meeting-list',
  },
  {
    name: '大厅',
    key: 'chat',
    icon: <IconMessage />,
    componentPath: 'chat',
  },
  {
    name: '视频会议',
    key: 'living',
    icon: <IconVideoCamera />,
    notInMenu: true,
    componentPath: 'living',
  },
];
