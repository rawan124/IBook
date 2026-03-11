import  { Input, DatePicker, Button } from "antd";
import { Form } from "antd";
import type { AddAuthorFormValues } from "../../types/AddAuthorFormValues";
import  { useEffect, useState } from "react";
import { useUploadImage } from "../../lib/hooks/useUploadImage";
import dayjs from "dayjs";
type Props = {
  onSubmit: (values: AddAuthorFormValues) => void;
  submitText?: string;
  loading?: boolean;
  initialValues?: AddAuthorFormValues;
};



const AuthorForm=({onSubmit, submitText, loading, initialValues}: Props)=>{
      const [form]=Form.useForm();
       const [file, setFile] = useState<File | null>(null);
        const [imageUrl, setImageUrl] = useState("");
        const uploadImage = useUploadImage();
          

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);
      
        const handleUpload = () => {
          if (!file) return;
      
          uploadImage.mutate(file, {
            onSuccess: (data) => {
              setImageUrl(data.imageUrl);
              form.setFieldValue("profilePicture", data.imageUrl);
            },
          });
        };
    

    return(
        <Form form={form} layout="vertical" onFinish={onSubmit}>
    <Form.Item
      label="First Name"
      name="firstName"
      rules={[{ required: true, message: "Please enter your first name" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Last Name"
      name="lastName"
      rules={[{ required: true, message: "Please enter your last name" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Country"
      name="countryOfOrigin"
      rules={[{ required: true, message: "Please enter your country of origin" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
  label="Date of Birth"
  name="dateOfBirth"
  rules={[{ required: true, message: "Please select date of birth" }]}
>
  <DatePicker style={{ width: "100%" }} />
</Form.Item>

<Form.Item
  label="Date of Death (optional)"
  name="dateOfDeath"
>
  <DatePicker style={{ width: "100%" }}  disabledDate={(current) => current && current > dayjs().endOf("day")} />
</Form.Item>


       <Form.Item
                label="Cover Image URL"
                name="profilePicture"
                rules={[{ required: true, message: "Please upload a profile picture" }]}
              >
         
                <input
      type="file"
      onChange={(e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      }}
    />
    <Button onClick={handleUpload}>
            Upload Image
          </Button>
    
          {imageUrl && (
            <img
              src={`http://localhost:5294${imageUrl}`}
              width={200}
            />
          )}
              </Form.Item>

    <Button type="primary" htmlType="submit" block loading={loading}>
      {submitText}
    </Button>
  </Form>
    )

}

export default AuthorForm;