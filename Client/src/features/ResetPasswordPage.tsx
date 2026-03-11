import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { useAuthPassword } from "../lib/hooks/useAuthPassword";

const { Title, Text } = Typography;

const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  const [tokenSent, setTokenSent] = useState(false);

  const { forgotPassword, resetPassword } = useAuthPassword();


  const handleSendToken = (values: { email: string }) => {
    forgotPassword.mutate(values.email, {
      onSuccess: () => {
        message.success(
          "If the email exists, a reset token has been sent."
        );
        setTokenSent(true);
      },
      onError: () => {
        message.error("Something went wrong.");
      },
    });
  };

 
  const handleResetPassword = (values: {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    resetPassword.mutate(
      {
        email: values.email,
        token: values.token,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          message.success("Password reset successfully!");
          form.resetFields();
          setTokenSent(false);
        },
        onError: () => {
          message.error("Invalid or expired token.");
        },
      }
    );
  };

  return (
    <div className="center-container" style={{margin: "100px 0"}}>
      <Card style={{ width: 400, borderRadius: 16 }}>
        <Title level={3}>Reset Password</Title>
        <Text type="secondary">
          Enter your email to receive a reset token
        </Text>

        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 20 }}
          onFinish={tokenSent ? handleResetPassword : handleSendToken}
        >
          
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
            disabled={tokenSent}
              prefix={<MailOutlined />}
              placeholder="example@email.com"
            />
          </Form.Item>

          
          {tokenSent && (
            <>
              <Form.Item
                label="Reset Token"
                name="token"
                rules={[
                  { required: true, message: "Enter the token" },
                ]}
              >
                <Input
                  prefix={<NumberOutlined />}
                  placeholder="Enter token from email"
                />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Enter new password" },
                  { min: 6, message: "Minimum 6 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="New password"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Confirm password" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm password"
                />
              </Form.Item>
            </>
          )}

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={
              tokenSent
                ? resetPassword.isPending
                : forgotPassword.isPending
            }
          >
            {tokenSent ? "Reset Password" : "Send Reset Token"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
