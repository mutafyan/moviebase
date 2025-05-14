import { Carousel, Skeleton, Empty } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Movie from "../../movies/MovieItem";
import "./popularMovies.css";

const GAP = 24;

const PrevArrow = ({ currentSlide, slideCount, ...rest }) => (
  <span {...rest} className="nav-arrow nav-arrow-prev">
    <LeftOutlined />
  </span>
);

const NextArrow = ({ currentSlide, slideCount, ...rest }) => (
  <span {...rest} className="nav-arrow nav-arrow-next">
    <RightOutlined />
  </span>
);

const PopularMovies = ({ movies, loading }) => {
  if (loading)
    return (
      <section style={{ padding: "0 60px" }}>
        <Skeleton active paragraph={{ rows: 3 }} style={{ height: 340 }} />
      </section>
    );

  if (!movies?.length)
    return (
      <Empty description="No popular movies found." style={{ padding: 80 }} />
    );

  return (
    <section style={{ padding: "40px 60px 96px" }}>
      <h2 style={{ marginBottom: 24 }}>Most popular movies of&nbsp;2025</h2>

      <Carousel
        className="popular-carousel"
        autoplay
        autoplaySpeed={4500}
        draggable
        pauseOnHover
        dotPosition="bottom"
        slidesToShow={4}
        slidesToScroll={1}
        dots
        dotsClass="slick-dots slick-line-dots slick-dots-bottom"
        arrows
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        responsive={[
          { breakpoint: 1280, settings: { slidesToShow: 3 } },
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1 } },
        ]}
      >
        {movies.map((m) => (
          <div key={m.id} style={{ padding: `0 ${GAP / 2}px` }}>
            <Movie movie={m} touchable={false}/>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default PopularMovies;
