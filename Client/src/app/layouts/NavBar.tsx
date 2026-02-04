import React, { useState } from 'react';
import {  SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Change Password',
    key: 'change-password',
    icon: <SettingOutlined />,
  },
   {
    label: 'Reset Password',
    key: 'reset',
    icon: <SettingOutlined />,
  },
  
 
 
  
];

const NavBar: React.FC = () => {
  const [current, setCurrent] = useState('change-password');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavBar;