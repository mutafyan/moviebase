import { Carousel, Skeleton, Empty, Divider, Typography, Grid } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ActorItem from "../movies/ActorItem";
import "./MovieCarousel/carouselStyle.css";

const GAP = 24;
const PrevArrow = ({ style, onClick }) => {
  return (
    <span
      className={`nav-arrow nav-arrow-prev`}
      style={style}
      onClick={onClick}
    >
      <LeftOutlined />
    </span>
  );
};

const NextArrow = ({ style, onClick }) => {
  return (
    <span
      className={`nav-arrow nav-arrow-next`}
      style={style}
      onClick={onClick}
    >
      <RightOutlined />
    </span>
  );
};

const ActorCarousel = ({ actors, loading }) => {
  const screens = Grid.useBreakpoint();

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
    <section
      style={{ padding: screens.md ? "40px 60px 96px" : "32px 16px 72px" }}
    >
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

export default ActorCarousel;
