import { useState } from "react";
import { Card, Rate, Badge, Button } from "antd";
import { poster } from "../../../api/movieApi";
import { useLocation, useNavigate } from "react-router";
import "./movieItem.css";

const MovieItem = ({ movie, touchable = true }) => {
  const {
    id,
    title,
    poster_path,
    vote_average,
    overview = "",
    release_date = "",
  } = movie;

  const year = release_date ? new Date(release_date).getFullYear() : "----";
  const location = useLocation();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleNavigate = () => {
    const path = location.pathname.includes("movies")
      ? `${id}`
      : `/movies/${id}`;
    navigate(path);
  };

  return (
    <Badge.Ribbon text={year} placement="end" color="#1677ff">
      <Card
        hoverable={touchable}
        className={`card ${touchable ? "touchable" : ""}`}
        styles={{ body: { padding: 0, background: "transparent" } }}
        cover={<img src={poster(poster_path)} alt={title} className="cover" />}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={touchable ? handleNavigate : undefined}
      >
        <div className="gradient" />

        <div className={`info ${hover ? "hover" : ""}`}>
          <div className="title">{title}</div>
          <div className="ratingRow">
            <Rate disabled allowHalf defaultValue={vote_average / 2} />
            <strong>({(vote_average / 2).toFixed(1)}/5)</strong>
          </div>
          <div className={`overview ${hover ? "hover" : ""}`}>
            {overview.slice(0, 140)}…
          </div>

          {!touchable && (
            <Button
              size="large"
              type="dashed"
              className="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate();
              }}
            >
              View details
            </Button>
          )}
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default MovieItem;
