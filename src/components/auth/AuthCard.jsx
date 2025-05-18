import { Card } from "antd";

const AuthCard = ({ children }) => (
  <Card
    style={{
      background: "rgba(240, 239, 239, 0.8)",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(0,0,0,0.05)",
      width: '50%',
      alignSelf: 'center',
      justifySelf: 'center'
    }}
  >
    {children}
  </Card>
);

export default AuthCard;
