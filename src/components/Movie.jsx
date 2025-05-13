import { useState } from "react";
import { Card, Rate, Badge } from "antd";
import { poster } from "../api/movieApi";
import { useLocation, useNavigate } from "react-router";

const Movie = ({ movie }) => {
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
  const styles = {
    card: { position: "relative", overflow: "hidden" },
    cover: { height: 300, objectFit: "cover" },

    gradient: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "60%",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)",
      pointerEvents: "none",
      zIndex: 0,
    },
    info: {
      position: "absolute",
      left: "50%",
      bottom: hover ? "35%" : 10,
      transform: `translate(-50%, ${hover ? "50%" : "0"})`,
      width: "88%",
      textAlign: "center",
      transition: "transform .35s ease, bottom .35s ease",
      zIndex: 1,
      color: "#fff",
      textShadow: "0 1px 3px rgba(0,0,0,0.8)",
    },
    title: { fontWeight: 600, fontSize: 16, marginBottom: 4 },
    ratingRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      fontSize: 14,
    },
    overview: {
      marginTop: 14,
      fontSize: 14,
      lineHeight: 1.35,
      opacity: hover ? 1 : 0,
      maxHeight: hover ? 140 : 0,
      overflow: "hidden",
      transition: "opacity .35s ease, max-height .35s ease",
    },
  };
  const handleNavigate = (id) => {
    const path = location.pathname.includes("movies")
      ? `${id}`
      : `/movies/${id}`;
    navigate(path);
  };
  return (
    <Badge.Ribbon text={year} placement="end" color="#1677ff">
      <Card
        hoverable
        style={styles.card}
        styles={{ body: { padding: 0, background: "transparent" } }}
        cover={
          <img src={poster(poster_path)} alt={title} style={styles.cover} />
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleNavigate(id)}
      >
        <div style={styles.gradient} />

        <div style={styles.info}>
          <div style={styles.title}>{title}</div>
          <div style={styles.ratingRow}>
            <Rate disabled allowHalf defaultValue={vote_average / 2} />
            <strong>({(vote_average / 2).toFixed(1)}/5)</strong>
          </div>
          <div style={styles.overview}>{overview.slice(0, 140)}…</div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default Movie;
