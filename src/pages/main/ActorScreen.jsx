import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getActorDetails, getActorMovies, poster } from "../../api/movieApi";
import { Row, Col, Typography, Spin, Divider } from "antd";
import MovieItem from "../../components/movies/MovieItem";

const ActorScreen = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorData = async () => {
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
    };

    fetchActorData();
  }, [id]);

  const getBirthday = (birthday) => {
    const [year, month, day] = birthday.split("-");
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
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
        <Typography.Title level={3}>Actor not found</Typography.Title>
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
          <Typography.Title>{actor.name}</Typography.Title>
          <Typography.Paragraph>
            {actor.biography || "Biography not available."}
          </Typography.Paragraph>
          <Typography.Text>
            <strong>Born:</strong> {getBirthday(actor.birthday) || "Unknown"}
            {actor.place_of_birth && `, ${actor.place_of_birth}`}
          </Typography.Text>
        </Col>
      </Row>

      <Divider style={{ marginTop: 48 }} />
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        Movies
      </Typography.Title>
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
