import React from 'react';
import { IconList, IconGift } from '@arco-design/web-react/icon';

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
    icon: <IconList />,
    componentPath: 'personal-info',
  },
];
