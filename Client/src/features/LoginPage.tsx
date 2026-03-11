
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { useAccount } from '../lib/hooks/useAccount';
import type { LoginFormValues } from '../types/LoginFormValues';
import { Link } from 'react-router';
import { useState } from 'react';
import CustomAlert from '../app/components/CustomAlert';

export function LoginPage() {
  const { loginUser } = useAccount();
  const [error,setError]=useState("");
  const onFinish = async(values: LoginFormValues) => {
    try{
    await loginUser.mutateAsync({
      email: values.username,
      password: values.password
    });
  }
  catch{
    setError("Invalid credentials");
  }
  };



  return (
    <Form
      name="login"

      style={{ maxWidth: 360, margin: '0 auto', marginTop: '200px' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
    
          <Link to="/reset-password">
          
            Forgot password?
            </Link>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <Link to="/registration">Register now!</Link>
      </Form.Item>
      {error && (
  <CustomAlert
    type="error"
    message="Login Failed"
    description={error}
    onClose={()=> setError("")}
  />
)}
    </Form>
  );
};

