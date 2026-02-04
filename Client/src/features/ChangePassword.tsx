import React from 'react';
import type { FormItemProps, FormProps } from 'antd';
import {
  Button,
  
  Form,
  Input,
 
  
} from 'antd';
import { useAccount } from '../lib/hooks/useAccount';
import type { InfoUpdates } from '../types/InfoUpdates';
import type { ChangePasswordFormValues } from '../types/ChangePasswordFormValues';


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

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const { changePassword } = useAccount();

  const onFinish = async (values: ChangePasswordFormValues) => {
  const dto: InfoUpdates = {
    OldPassword: values.oldPassword,
    NewPassword: values.newPassword,
  };

  await changePassword.mutateAsync(dto);
};
 
  

  


  return (
    <Form
      labelAlign="left"
      labelWrap
      {...formItemLayout}
      form={form}
      
      name="changePassword"
      onFinish={onFinish}
      style={{maxWidth: 600, margin: '0 auto'}}
      scrollToFirstError
    >
      <Form.Item
        name="oldPassword"
        label="Old Password"
        rules={[
          {
            required: true,
            message: 'Please input your old password!',
          },
          {
            required: true,
            message: 'Please input your old password!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
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
        <Button type="primary" htmlType="submit">
            Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;