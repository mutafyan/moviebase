import { Row, Col, Card, Skeleton, Empty } from "antd";
import { poster } from "../../api/movieApi";

const PopularActors = ({ actors, loading }) => {
  if (loading)
    return (
      <Row gutter={[24, 32]} style={{ padding: "0 60px" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Col xs={12} sm={8} md={6} lg={4} key={i}>
            <Skeleton.Image active style={{ width: "100%", height: 300 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    );

  if (!actors?.length)
    return (
      <Empty description="No popular actors found." style={{ padding: 80 }} />
    );

  return (
    <section style={{ padding: "40px 60px" }}>
      <h2 style={{ marginBottom: 24 }}>Most popular actors of 2025</h2>
      <Row gutter={[24, 32]}>
        {actors.map((a) => (
          <Col xs={12} sm={8} md={6} lg={4} key={a.id}>
            <Card
              hoverable
              cover={
                <img
                  src={a.profile_path ? poster(a.profile_path) : undefined}
                  alt={a.name}
                  loading="lazy"
                  style={{ height: 300, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title={a.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default PopularActors;
