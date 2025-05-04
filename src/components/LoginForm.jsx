import { useState } from "react";
import "../styles/LoginForm.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
const EMAIL_KEY = "login_email";
const AUTH_KEY = "auth_status";

const LoginForm = () => {
  const [email, setEmail] = useState(localStorage.getItem(EMAIL_KEY) || "");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(AUTH_KEY) === "true"
  );

  const validateEmail = (email) => {
    /** for email
     * include @
     * include .
     * include domain after @
     */
    const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(res ? "" : "Enter a valid email address.");
    return res;
  };

  const validatePassword = (password) => {
    /** for password
     * at least 8 characters
     * one lowercase letter
     * one uppercase letter
     * one number
     * one special character (@$!%*?&)
     */
    const res = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      password
    );
    setPasswordError(
      res
        ? ""
        : "Password must be 8+ chars with upper, lower, number & special char."
    );
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailOK = validateEmail(email);
    const passOK = validatePassword(password);
    if (emailOK && passOK) {
      localStorage.setItem(EMAIL_KEY, email);
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      alert("Login successful");
    }
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setIsAuthenticated(false);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.setItem(AUTH_KEY, "false");
  };

  const isSubmitDisabled =
    !email || !password || !!emailError || !!passwordError;

  if (isAuthenticated) {
    return (
      <div className="login-box">
        <p>
          You are logged in as <strong>{email}</strong>.
        </p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="login-box">
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        className={emailError ? "error-input" : ""}
      />
      {emailError && <div className="error-text">{emailError}</div>}

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          className={passwordError ? "error-input" : ""}
        />
        <button
          type="button"
          className="toggle-button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeInvisibleOutlined/> : <EyeOutlined/>}
        </button>
      </div>
      {passwordError && <div className="error-text">{passwordError}</div>}

      <div className="buttons-container">
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
