import { useEffect, useState, Suspense } from "react";
import {
  Row,
  Col,
  Typography,
  Rate,
  Tag,
  Descriptions,
  Divider,
  Image,
  Skeleton,
  Carousel,
  App,
} from "antd";
import { getMovieDetails, poster } from "../../../api/movieApi";
import { useParams } from "react-router";
import "./movieDetailStyle.css";
const { Title, Paragraph, Text } = Typography;

const MovieDetailScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { message } = App.useApp();

  useEffect(() => {
    if (!id) return;
    getMovieDetails(id)
      .then(setMovie)
      .catch((err) => {
        message.error(err.message);
        setMovie(false);
      });
  }, [id, message]);

  if (movie === null) return <Skeleton active paragraph={{ rows: 10 }} />;
  if (movie === false) return <p>Couldn’t load the movie.</p>;

  const trailer = movie.videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const topCast = movie.credits.cast.slice(0, 5);
  const backdrops = movie.images.backdrops.slice(0, 6);

  return (
    <>
      <div className="detail-card">
        <Row gutter={32}>
          <Col xs={24} md={8}>
            <Image
              src={poster(movie.poster_path)}
              alt={movie.title}
              width="100%"
              style={{ borderRadius: 8 }}
              preview={false}
            />
          </Col>

          <Col xs={24} md={16}>
            <Title>{movie.title}</Title>
            {movie.tagline && (
              <Paragraph italic style={{ marginTop: -12 }}>
                "{movie.tagline}"
              </Paragraph>
            )}
            <Rate disabled allowHalf defaultValue={movie.vote_average / 2} />
            <Text type="secondary" style={{ marginLeft: 8 }}>
              {movie.vote_average.toFixed(1)} / 10
            </Text>

            <Divider />

            <Paragraph>{movie.overview}</Paragraph>

            <Descriptions size="small" column={1} bordered>
              <Descriptions.Item label="Release">
                {movie.release_date}
              </Descriptions.Item>
              <Descriptions.Item label="Runtime">
                {movie.runtime} min
              </Descriptions.Item>
              <Descriptions.Item label="Budget">
                ${movie.budget.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Revenue">
                ${movie.revenue.toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {movie.genres.map((g) => (
              <Tag key={g.id}>{g.name}</Tag>
            ))}
          </Col>
        </Row>

        {trailer && (
          <>
            <Divider orientation="left">Official trailer</Divider>
            <Suspense fallback={<Skeleton.Image />}>
              <iframe
                title="Trailer"
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
                style={{ border: 0 }}
              />
            </Suspense>
          </>
        )}

        {backdrops.length > 0 && (
          <>
            <Divider orientation="left">Stills & backgrounds</Divider>
            <Carousel
              autoplay
              dots
              draggable
              style={{ maxWidth: 800, margin: "0 auto" }}
            >
              {backdrops.map((b) => (
                <Image
                  key={b.file_path}
                  src={poster(b.file_path)}
                  preview={false}
                  style={{ marginBottom: "60px" }}
                />
              ))}
            </Carousel>
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetailScreen;
