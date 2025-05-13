import { Row, Col, Skeleton, Empty, Carousel } from "antd";
import Movie from "./Movie";
import { useNavigate } from "react-router";

const PopularMovies = ({ movies, loading }) => {
  if (loading) {
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
  }

  if (!movies?.length) {
    return (
      <Empty description="No popular movies found." style={{ padding: 80 }} />
    );
  }

  return (
    <section style={{ padding: "40px 60px" }}>
      <h2 style={{ marginBottom: 24 }}>Most popular movies of 2025</h2>

      <Carousel
        arrows={true}
        dots={false}
        infinite={true}
        swipeToSlide={true}
        slidesToShow={5} // desktop default
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1536, settings: { slidesToShow: 5 } },
          { breakpoint: 1280, settings: { slidesToShow: 4 } },
          { breakpoint: 992, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]}
        style={{minHeight: 'max-content'}}
      >
        {movies.map((m) => (
          <div key={m.id} style={{ padding: "0 20px"}}>
            <Movie movie={m}/>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default PopularMovies;
