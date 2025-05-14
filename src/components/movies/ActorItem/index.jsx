import { Avatar, Typography } from "antd";
import { poster } from "../../../api/movieApi";
import "./actorItem.css";
import { useNavigate } from "react-router";

const ActorItem = ({ actor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/actor/${actor.id}`);
  };

  return (
    <div
      className="actor-item"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Avatar
        src={poster(actor.profile_path)}
        size={120}
        style={{ margin: "0 auto", border: "3px solid #eee" }}
      />
      <Typography.Text
        style={{ display: "block", marginTop: 12, fontWeight: 500 }}
      >
        {actor.name}
      </Typography.Text>
    </div>
  );
};

export default ActorItem;
