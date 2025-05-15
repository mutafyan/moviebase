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
  List,
  Card,
  App,
  Space,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getMovieDetails, poster } from "../../../api/movieApi";
import { useParams } from "react-router";
import ActorCarousel from "../../../components/home/ActorCarousel";
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
  if (movie === false) return <p>Couldn't load the movie.</p>;

  const {
    title,
    original_title,
    tagline,
    release_date,
    runtime,
    budget,
    revenue,
    genres,
    vote_average,
    overview,
    poster_path,
    imdb_id,
    homepage,
    status,
    popularity,
    original_language,
    belongs_to_collection,
    production_companies = [],
    production_countries = [],
    spoken_languages = [],
  } = movie;

  const videos = movie.videos?.results || [];
  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const creditsCast = movie.credits?.cast || [];
  const actors = creditsCast.slice(0, 10);

  const backdrops = movie.images?.backdrops?.slice(0, 6) || [];
  const reviews = movie.reviews?.results || [];

  return (
    <div className="detail-card">
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Image
            src={poster(poster_path)}
            alt={title}
            width="100%"
            className="poster-image"
            preview={false}
          />
          {trailer && (
            <div className="trailer-container">
              <Suspense
                fallback={<Skeleton.Image className="trailer-skeleton" />}
              >
                <iframe
                  className="trailer-iframe"
                  title="Trailer"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                />
              </Suspense>
            </div>
          )}
        </Col>

        <Col xs={24} md={16}>
          <Title level={2}>{title}</Title>
          {tagline && <Paragraph italic>"{tagline}"</Paragraph>}

          <div className="rating-container">
            <Rate disabled allowHalf defaultValue={vote_average / 2} />
            <Text type="secondary" className="rating-text">
              {vote_average.toFixed(1)} / 10
            </Text>
          </div>

          <Descriptions
            size="small"
            column={1}
            bordered
            className="detail-descriptions"
          >
            <Descriptions.Item label="Original Title">
              {original_title}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{status}</Descriptions.Item>
            <Descriptions.Item label="Release Date">
              {release_date}
            </Descriptions.Item>
            <Descriptions.Item label="Runtime">{runtime} min</Descriptions.Item>
            <Descriptions.Item label="Budget">
              ${budget.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Revenue">
              ${revenue.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Popularity">
              {popularity.toFixed(1)}
            </Descriptions.Item>
            <Descriptions.Item label="Original Language">
              {original_language.toUpperCase()}
            </Descriptions.Item>
            {homepage && (
              <Descriptions.Item label="Homepage">
                <a href={homepage} target="_blank" rel="noreferrer">
                  Official Site
                </a>
              </Descriptions.Item>
            )}
            {imdb_id && (
              <Descriptions.Item label="IMDb">
                <a
                  href={`https://www.imdb.com/title/${imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on IMDb
                </a>
              </Descriptions.Item>
            )}
            {belongs_to_collection && (
              <Descriptions.Item label="Collection">
                <a
                  href={`https://www.themoviedb.org/collection/${belongs_to_collection.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {belongs_to_collection.name}
                </a>
              </Descriptions.Item>
            )}
          </Descriptions>

          <Paragraph>{overview}</Paragraph>

          <Divider orientation="left" style={{ fontSize: "20px" }}>
            Genres
          </Divider>
          <Space wrap className="genres-space">
            {genres?.map((g) => (
              <Tag key={g.id} color="blue">
                {g.name}
              </Tag>
            ))}
          </Space>

          <Divider orientation="left" style={{ fontSize: "20px" }}>
            Cast
          </Divider>
          <div className="cast-section">
            <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
              <ActorCarousel actors={actors} loading={!actors.length} />
            </Suspense>
          </div>
        </Col>
      </Row>

      {production_companies.length > 0 && (
        <>
          <Divider orientation="left" style={{ fontSize: "20px" }}>
            Production Companies
          </Divider>
          <Row gutter={[16, 16]}>
            {production_companies.map((company) => (
              <Col key={company.id} xs={12} sm={8} md={6} lg={4}>
                <Card
                  hoverable
                  size="small"
                  cover={
                    company.logo_path && (
                      <Image
                        src={poster(company.logo_path)}
                        alt={company.name}
                        className="company-logo"
                        preview={false}
                      />
                    )
                  }
                >
                  {company.name}
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      <Row gutter={[32, 32]} className="countries-languages-row">
        {production_countries.length > 0 && (
          <Col xs={24} md={12}>
            <Divider orientation="left" style={{ fontSize: "20px" }}>
              Production Countries
            </Divider>
            <Space wrap>
              {production_countries.map((c) => (
                <Tag key={c.iso_3166_1}>{c.name}</Tag>
              ))}
            </Space>
          </Col>
        )}
        {spoken_languages.length > 0 && (
          <Col xs={24} md={12}>
            <Divider orientation="left" style={{ fontSize: "20px" }}>
              Spoken Languages
            </Divider>
            <Space wrap>
              {spoken_languages.map((l) => (
                <Tag key={l.iso_639_1}>{l.name}</Tag>
              ))}
            </Space>
          </Col>
        )}
      </Row>

      {backdrops.length > 0 && (
        <>
          <Divider orientation="left" style={{ fontSize: "20px" }}>
            Stills & Backgrounds
          </Divider>
          <Carousel autoplay dots draggable className="backdrops-carousel">
            {backdrops.map((b) => (
              <Image
                key={b.file_path}
                src={poster(b.file_path)}
                preview={false}
                className="backdrop-image"
              />
            ))}
          </Carousel>
        </>
      )}

      {reviews.length > 0 && (
        <>
          <Divider orientation="left" style={{ fontSize: "20px" }}>
            User Reviews
          </Divider>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
            dataSource={reviews.slice(0, 6)}
            renderItem={(review) => (
              <List.Item>
                <Card>
                  <div className="review-card-content">
                    <Avatar
                      icon={<UserOutlined />}
                      size={48}
                      className="review-avatar"
                    />
                    <div>
                      <Text strong>{review.author}</Text>
                      <Paragraph ellipsis={{ rows: 4 }}>
                        {review.content}
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default MovieDetailScreen;
