import AuthCard   from "../../components/auth/AuthCard";
import LoginForm  from "../../components/auth/LoginForm";

const LoginScreen = () => (
  <div style={{ minWidth: '450px', margin: "0 auto", padding: "40px 0" }}>
    <h2>Login</h2>
    <AuthCard>
      <LoginForm />
    </AuthCard>
  </div>
);

export default LoginScreen;
