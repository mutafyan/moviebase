import { useState } from "react";
import { Form, Input, Button, App } from "antd";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { register } from "../../api/authApi";
import AuthCard from "../../components/auth/AuthCard";

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const onFinish = async ({ email, password }) => {
    setLoading(true);
    try {
      const cred = await register(email, password);
      dispatch(
        setUser({
          uid: cred.user.uid,
          email: cred.user.email,
        })
      );
      message.success("Registration successful!", 2);
      navigate("/", { replace: true });
    } catch (error) {
      message.error(
        error.message || "Something went wrong during registration."
      );
    }
    setLoading(false);
  };

  return (
    <div style={{ minWidth: "480px", margin: "0 auto", padding: "40px 0" }}>
      <h2>Register</h2>
      <AuthCard>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input autoFocus />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                pattern: passwordRegex,
                message:
                  "Password must be 8+ chars with upper, lower, number & special char.",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </div>
      </AuthCard>
    </div>
  );
};

export default RegisterScreen;
