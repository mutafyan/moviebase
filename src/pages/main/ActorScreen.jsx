import { useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { Row, Col, Typography, Spin, Divider, Button, Space } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getActorDetails, getActorMovies, poster } from "../../api/movieApi";
import MovieItem from "../../components/movies/MovieItem";
import { toggleFavouriteActor } from "../../store/slices/userListsSlice";

const { Title, Paragraph, Text } = Typography;

const ActorScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favActors = useSelector((state) => state.userLists.favourites.actors);
  const isFav = favActors.includes(Number(id));

  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActorData = useCallback(async () => {
    setLoading(true);
    try {
      const [actorData, creditsData] = await Promise.all([
        getActorDetails(id),
        getActorMovies(id),
      ]);
      setActor(actorData);
      setMovies(creditsData.cast.sort((a, b) => b.popularity - a.popularity));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchActorData();
  }, [fetchActorData]);

  const handleToggleFav = () => {
    dispatch(toggleFavouriteActor({ actorId: Number(id) }));
  };

  const formatBirthday = (dateStr) => {
    if (!dateStr) return "Unknown";
    const [y, m, d] = dateStr.split("-");
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!actor) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Title level={3}>Actor not found</Title>
      </div>
    );
  }

  return (
    <section style={{ padding: "40px 60px" }}>
      <Row gutter={[40, 24]}>
        <Col xs={24} md={8}>
          <img
            src={poster(actor.profile_path)}
            alt={actor.name}
            style={{ width: "100%", borderRadius: 16 }}
          />
        </Col>

        <Col xs={24} md={16}>
          <Space align="center" style={{ marginBottom: 16 }}>
            <Title level={2} style={{ margin: 0 }}>
              {actor.name}
            </Title>
            <Divider
              type="vertical"
              style={{ margin: "0 12px", height: "40px" }}
            />
            <Button
              type="text"
              size="large"
              style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }}
              icon={
                isFav ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <HeartOutlined />
                )
              }
              onClick={handleToggleFav}
            >
              Add to favourites
            </Button>
          </Space>

          <Paragraph>{actor.biography || "Biography not available."}</Paragraph>

          <Text>
            <strong>Born:</strong> {formatBirthday(actor.birthday)}
            {actor.place_of_birth && `, ${actor.place_of_birth}`}
          </Text>
        </Col>
      </Row>

      <Divider style={{ marginTop: 48 }} />

      <Title level={3} style={{ textAlign: 'left', marginBottom: 24 }}>
        Featured movies
      </Title>

      <Row gutter={[24, 32]}>
        {movies.map((movie) => (
          <Col xs={12} sm={8} md={6} lg={4} key={movie.id}>
            <MovieItem movie={movie} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ActorScreen;
