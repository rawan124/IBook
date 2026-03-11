import { Link } from "react-router";
import {Badge, Dropdown, List, Space, Typography, Flex, Avatar, Card, Empty } from "antd";
import UserMenu from "../components/UserMenu";
import { useAuth } from "../../lib/hooks/useAuth";
import {BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useMarkAsRead, useNotifications } from "../../lib/hooks/useNotifications";


const { Text } = Typography;

export default function NavBar() {
  const { isAuthenticated } = useAuth();
  const { data: notifications } = useNotifications();
  const markAsRead = useMarkAsRead();

  

const unreadCount =
  notifications?.filter((n) => !n.isRead).length ?? 0;

const notificationContent = (
  <Card
    title="Notifications"
    style={{ width: 360 }}
    
  >
    <List
      dataSource={notifications}
      locale={{ emptyText: <Empty description="No notifications" /> }}
      renderItem={(item) => (
        <List.Item
          onClick={() => markAsRead.mutate(item.id)}
          style={{
            backgroundColor: item.isRead
              ? undefined
              : "#f6faff",
            cursor: "pointer",
          }}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                icon={<CheckCircleOutlined />}
                style={{
                  backgroundColor: item.isRead
                    ? "#d9d9d9"
                    : "#1677ff",
                }}
              />
            }
            title={
              <Space>
                <Text strong={!item.isRead}>
                  {item.message}
                </Text>
              </Space>
            }
            description={
              <Text type="secondary">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            }
          />
        </List.Item>
      )}
    />
  </Card>
);

  


  return (
    
    <div
      style={{
        padding: "18px 48px",
      
        display: "flex",

        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,0.05)",

        
        background: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",



        
      }}
    >
     
      
      <Link to="/" style={{ textDecoration: "none" }}>
        <Text strong style={{ fontSize: 22, letterSpacing: 1, color: "#2563EB", fontFamily: "Playfair Display" }}>
          IBook
        </Text>
      </Link>
     

       <div className="navbar" style={{flex: 1, textAlign: "center"}}>  
      <Space size="large" style={{flex: 1, textAlign: "center"}}>
         <Link to="/authors" style={{textDecoration:"none"}}>  
         <Text strong style={{color: "#2563EB", fontFamily: "Inter", fontSize: 20, letterSpacing: 1}}>
          View Authors
         </Text>
         
          </Link>
         <Link to="/books" style={{textDecoration: "none"}}> 
          <Text strong style={{color: "#2563EB", fontFamily: "Inter", fontSize: 20, letterSpacing: 1}}>
          View Books
         </Text>
          </Link>
         </Space>
        </div>
        <div style={{marginLeft: "auto"}}>
      { !isAuthenticated ? (
         <Space size="large" >
    
        <Link to="/registration" style={{ textDecoration: "none"}}>
         <Text strong style={{color: "#2563EB", fontFamily: "Inter", fontSize: 20, letterSpacing: 1}}>
        Signup
        </Text>
        
        </Link>
        <Link to="/login" style={{ textDecoration:"none" }}>
        <Text strong style={{color: "#2563EB", fontFamily: "Inter", fontSize: 20, letterSpacing: 1}}>
        Login
        </Text>
        </Link>


        
      </Space> ) : (
        <Flex gap={5}>
        <Dropdown
  popupRender={() => notificationContent}
  trigger={["click"]}
>
  <Badge count={unreadCount}>
    <BellOutlined
      style={{
        fontSize: 20,
        cursor: "pointer",
      }}
    />
  </Badge>
  
</Dropdown>
       
        <UserMenu />
        
        </Flex>

      )
      }
      
      </div>
      
      
      
  </div>
      

  );
}
