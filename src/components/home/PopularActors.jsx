import { Carousel, Skeleton, Empty, Divider, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ActorItem from "../movies/ActorItem";
import "./PopularMovies/popularMovies.css";

const GAP = 24;

const PrevArrow = (props) => (
  <span {...props} className="nav-arrow nav-arrow-prev">
    <LeftOutlined />
  </span>
);

const NextArrow = (props) => (
  <span {...props} className="nav-arrow nav-arrow-next">
    <RightOutlined />
  </span>
);

const PopularActors = ({ actors, loading }) => {
  if (loading)
    return (
      <section style={{ padding: "0 60px" }}>
        <Skeleton active paragraph={{ rows: 3 }} style={{ height: 280 }} />
      </section>
    );

  if (!actors?.length)
    return (
      <Empty description="No popular actors found." style={{ padding: 80 }} />
    );

  return (
    <section style={{ padding: "40px 60px 96px" }}>
      <Typography.Title
        level={2}
        style={{ marginBottom: 24, textAlign: "left", paddingLeft: "20px" }}
      >
        Popular actors of 2025
      </Typography.Title>
      <Divider variant="solid" />
      <Carousel
        className="popular-carousel"
        autoplay
        autoplaySpeed={4500}
        draggable
        pauseOnHover
        dotPosition="bottom"
        slidesToShow={5}
        slidesToScroll={1}
        dots
        dotsClass="slick-dots slick-line-dots slick-dots-bottom"
        arrows
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        responsive={[
          { breakpoint: 1280, settings: { slidesToShow: 4 } },
          { breakpoint: 992, settings: { slidesToShow: 3 } },
          { breakpoint: 600, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]}
      >
        {actors.map((actor) => (
          <div key={actor.id} style={{ padding: `0 ${GAP / 2}px` }}>
            <ActorItem actor={actor} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default PopularActors;
