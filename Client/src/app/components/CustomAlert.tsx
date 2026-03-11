import React from "react";
import { Alert } from "antd";

interface CustomAlertProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description?: string;
  onClose?:()=> void
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  type,
  message,
  description,
  onClose
}) => {
  return (
    <Alert
      title={message}
      description={description}
      type={type}
      showIcon
      closable={{
        onClose: onClose,
        closeIcon: true,
      }}
      style={{ marginBottom: 16 }}
    />
  );
};

export default CustomAlert;
