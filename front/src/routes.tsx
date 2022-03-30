import React from 'react';
import { IconUserGroup, IconGift, IconUser } from '@arco-design/web-react/icon';

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
    name: '会议模块',
    key: 'meeting',
    icon: <IconUserGroup />,
    componentPath: 'meeting',
  },
];
