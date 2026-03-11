import React from 'react';
import { DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Space } from 'antd';
import type { DropdownProps, MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import { useAuth } from '../../lib/hooks/useAuth';
import { useNavigate } from 'react-router';
const useStyles = createStyles(({ token }) => ({
  root: {
    backgroundColor: token.colorFillAlter,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));




const functionStyles: DropdownProps['styles'] = (info) => {
  
  const { props } = info;
  const isClick = props.trigger?.includes('click');
  if (isClick) {
    return {
      root: {
        //borderColor: '#1890ff',
        borderRadius: '8px',
      },
    } satisfies DropdownProps['styles'];
  }
  return {};
};

const UserMenu: React.FC = () => {
    const { styles } = useStyles();
  const {  user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };
  const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    onClick: () => { navigate('/profile') },
  },
  {
    key: '2',
    label: 'Change Password',
    icon: <SettingOutlined />,
    onClick: () => { navigate('/change-password') },
  },
    ...(user?.role === "SuperAdmin"
    ? [
        {
          key: "admin",
          label: "Admin Dashboard",
          onClick: () => navigate("/booksAdmin"),
        },
      ]
    : []),
  {
    type: 'divider',
  },
  {
    key: '3',
    label: 'Logout',
    icon: <LogoutOutlined />,
    onClick: handleLogout,
    danger: true,
  },
];
  
  const sharedProps: DropdownProps = {
    menu: { items },
    placement: 'bottomLeft',
    classNames: { root: styles.root },
  };

  return (
    <Flex gap="middle" wrap="wrap">
      <Space vertical size="large">

        <Dropdown {...sharedProps} styles={functionStyles} trigger={['click']}>
          <Button type="text">
            <Space>
              
              {user?.username}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </Flex>
  );
};

export default UserMenu;