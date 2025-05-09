import { Card } from "antd";

const AuthCard = ({ children }) => (
  <Card
    style={{
      background: "rgba(240, 239, 239, 0.8)",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(0,0,0,0.05)",
    }}
  >
    {children}
  </Card>
);

export default AuthCard;
