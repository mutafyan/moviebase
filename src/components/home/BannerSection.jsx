import { useEffect, useState } from "react";
import { Typography, Button, message, Grid, App } from "antd";
import { PlayCircleFilled, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { banner, getMovieDetails } from "../../api/movieApi";
import WatchListButton from "../common/WatchListButton";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const BannerSection = ({ movie }) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { message } = App.useApp();
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    let cancel = false;
    const load = async () => {
      if (!movie?.id) return;

      try {
        const data = await getMovieDetails(movie.id);
        const trailer =
          data.videos.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          ) || null;
        if (!cancel) setTrailerKey(trailer?.key ?? null);
      } catch {
        if (!cancel) setTrailerKey(null);
      }
    };
    load();
    return () => (cancel = true);
  }, [movie]);

  if (!movie) return null;

  const backdrop = movie.backdrop_path && banner(movie.backdrop_path);

  return (
    <section
      style={{
        position: "relative",
        minHeight: isMobile ? 320 : 420,
        display: "flex",
        alignItems: "center",
        background: backdrop
          ? `linear-gradient(to right, rgba(0,0,0,.85) 0%, rgba(0,0,0,.4) 60%, rgba(0,0,0,0) 90%), url(${backdrop}) center/cover`
          : "#222",
        borderRadius: 8,
        overflow: "hidden",
        margin: isMobile ? "0 16px 32px" : "0 40px 40px",
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? "100%" : 640,
          padding: isMobile ? "24px" : "48px 60px",
          color: "#fff",
        }}
      >
        <Title level={isMobile ? 2 : 1} style={{ color: "#fff" }}>
          {movie.title}
        </Title>

        {movie.tagline && (
          <Text
            italic
            style={{ color: "#fff", display: "block", marginBottom: 16 }}
          >
            “{movie.tagline}”
          </Text>
        )}

        <Paragraph
          style={{ color: "#fff", marginBottom: 24 }}
          ellipsis={{ rows: isMobile ? 4 : 3 }}
        >
          {movie.overview || "No overview available."}
        </Paragraph>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            More about the movie
          </Button>

          <WatchListButton size="large" movieId={movie.id} />
        </div>
      </div>

      {!isMobile && (
        <PlayCircleFilled
          onClick={() =>
            trailerKey
              ? window.open(
                  `https://www.youtube.com/watch?v=${trailerKey}`,
                  "_blank"
                )
              : message.info("Trailer unavailable")
          }
          style={{
            position: "absolute",
            top: "50%",
            right: "12%",
            transform: "translateY(-50%)",
            fontSize: 96,
            color: "rgba(255,255,255,.85)",
            cursor: "pointer",
            opacity: 0.6,
          }}
        />
      )}
    </section>
  );
};

export default BannerSection;
