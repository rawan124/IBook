import React from 'react';
import type { FormItemProps, FormProps } from 'antd';
import {
  Button,
  
  
  Form,
  Input
} from 'antd';
import { useAccount } from '../lib/hooks/useAccount';

import type { RegisterDto } from '../types/RegisterDto';
import type { RegisterFormValues } from '../types/RegisterFormValues';
import { useNavigate } from 'react-router';




const formItemLayout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout: FormItemProps = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { registerUser } = useAccount();
  const onSubmit = async (data: RegisterFormValues) => {
    const dto: RegisterDto = {
    userName: data.username,
    email: data.email,
    password: data.password,
  };
    try {
    await registerUser.mutateAsync(dto);
    navigate('/login');
  }  catch (error) {
  const err = error as { response?: { data?: string[] } };
  const errors = err.response?.data;

  if (Array.isArray(errors)) {
    const fields = errors.map((message) => {
      if (message.toLowerCase().includes("username")) {
        return { name: "username", errors: [message] };
      }

      if (message.toLowerCase().includes("email")) {
        return { name: "email", errors: [message] };
      }

      if (message.toLowerCase().includes("password")) {
        return { name: "password", errors: [message] };
      }

      return { name: "username", errors: [message] };
    });

    form.setFields(fields);
  }
}
};

  


  return (
    <Form
      labelAlign="left"
      labelWrap
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmit}
      
      style={{maxWidth: 600, margin: '0 auto'}}
      scrollToFirstError
    >
        <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

     

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={registerUser.isPending}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;