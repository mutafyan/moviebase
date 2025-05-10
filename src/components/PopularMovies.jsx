import { Row, Col, Card, Rate, Skeleton, Empty } from 'antd';
import { poster } from '../api/movieApi';

const PopularMovies = ({ movies, loading }) => {
  if (loading) {
    return (
      <Row gutter={[24, 32]} style={{ padding: '0 60px' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Col xs={12} sm={8} md={6} lg={4} key={i}>
            <Skeleton.Image active style={{ width: '100%', height: 300 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    );
  }

  if (!movies?.length) {
    return <Empty description="No popular movies found." style={{ padding: 80 }} />;
  }

  return (
    <section style={{ padding: '40px 60px' }}>
      <h2>Most popular movies of 2025</h2>
      <Row gutter={[24, 32]}>
        {movies.map((m) => (
          <Col xs={12} sm={8} md={6} lg={4} key={m.id}>
            <Card
              hoverable
              cover={
                <img
                  src={poster(m.poster_path)}
                  alt={m.title}
                  loading="lazy"
                  style={{ height: 300, objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta title={m.title} />
              <Rate disabled allowHalf defaultValue={m.vote_average / 2} />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default PopularMovies;
