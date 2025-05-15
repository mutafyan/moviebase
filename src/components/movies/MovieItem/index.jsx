import { useEffect, useRef, useState } from "react";
import { Card, Rate, Badge, Button, Col, Spin } from "antd";
import { poster } from "../../../api/movieApi";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled, HeartTwoTone } from "@ant-design/icons";
import { toggleFavouriteMovie } from "../../../store/slices/userListsSlice";
import WatchListButton from "../../common/WatchListButton";
import "./movieItem.css";

const MovieItem = ({ movie, clickable = true }) => {
  const {
    id,
    title,
    poster_path,
    vote_average,
    overview = "",
    release_date = "",
  } = movie;
  const year = release_date ? new Date(release_date).getFullYear() : "----";
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const cardRef = useRef(null);
  const inFavourites = useSelector(
    (s) =>
      Array.isArray(s.userLists.favourites.movies) &&
      s.userLists.favourites.movies.includes(id)
  );

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setNarrow(entry.contentRect.width < 200)
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const handleNavigate = () => {
    const path = location.pathname.includes("movies")
      ? `${id}`
      : `/movies/${id}`;
    navigate(path);
  };

  const handleFavClick = async (e) => {
    e.stopPropagation();
    setFavLoading(true);
    await dispatch(toggleFavouriteMovie({ movieId: id })).unwrap();
    setFavLoading(false);
  };

  return (
    <Badge.Ribbon text={year} placement="end" color="#1677ff">
      <Card
        hoverable={clickable}
        className={`card ${clickable ? "clickable" : ""} ${
          narrow ? "narrow" : ""
        }`}
        style={{ position: "relative" }}
        bodyStyle={{ padding: 0, background: "transparent" }}
        cover={<img src={poster(poster_path)} alt={title} className="cover" />}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={clickable ? handleNavigate : undefined}
        ref={cardRef}
      >
        <div className="fav-icon" onClick={handleFavClick}>
          {favLoading ? (
            <Spin size="small" />
          ) : inFavourites ? (
            <HeartFilled />
          ) : (
            <HeartTwoTone twoToneColor="#eb2f96" />
          )}
        </div>
        <div className="gradient" />
        <div className={`info ${hover ? "hover" : ""}`}>
          <div className="title">
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </div>
          <div className={`ratingRow ${hover ? "hover" : ""}`}>
            <Rate disabled allowHalf defaultValue={vote_average / 2} />
            <strong>({(vote_average / 2).toFixed(1)}/5)</strong>
          </div>
          <div className={`overview ${hover ? "hover" : ""}`}>
            {overview.slice(0, 70)}…
          </div>
          <Col align="middle" style={{ padding: "5px 5px" }}>
            {!clickable && (
              <Button
                size="medium"
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate();
                }}
                className="button"
              >
                View details
              </Button>
            )}
            <WatchListButton size="small" movieId={id} type="dashed" className="button"/>
          </Col>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default MovieItem;
