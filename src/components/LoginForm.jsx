import { useState } from "react";
import { Form, Input, Button, App } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { login, getEmail } from "../api/authApi";
import { useNavigate, NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = App.useApp();

  const onFinish = async ({ email, password }) => {
    setSubmitting(true);
    try {
      const cred = await login(email, password);
      dispatch(
        setUser({
          uid: cred.user.uid,
          email: cred.user.email,
        })
      );
      message.success("Login successful", 2);
      navigate("/", { replace: true });
    } catch (err) {
      message.error(err.message || "Authentication failed", 3);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="login"
      initialValues={{ email: getEmail() }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your e-mail" },
          { type: "email", message: "Invalid e-mail format" },
        ]}
      >
        <Input placeholder="Enter your e-mail" autoFocus />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password
          placeholder="Enter your password"
          iconRender={(v) => (v ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting} block>
          Submit
        </Button>
      </Form.Item>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </div>
    </Form>
  );
};

export default LoginForm;
