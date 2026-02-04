
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useAccount } from '../lib/hooks/useAccount';
import type { LoginFormValues } from '../types/LoginFormValues';

export function LoginPage() {
  const { loginUser } = useAccount();
  const onFinish = async(values: LoginFormValues) => {
    await loginUser.mutateAsync({
      email: values.username,
      password: values.password
    });
  };



  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <a href="">Register now!</a>
      </Form.Item>
    </Form>
  );
};

