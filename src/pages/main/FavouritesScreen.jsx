import { useState, useEffect } from "react";
import { Tabs, Empty, Spin } from "antd";
import { useSelector } from "react-redux";
import { getMovieDetails, getActorDetails } from "../../api/movieApi";
import MovieGrid from "../../components/movies/MovieGrid";
import ActorGrid from "../../components/movies/ActorGrid";

const PAGE_SIZE = 20;

export default function FavouritesScreen() {
  const favMovieIds = useSelector((s) => s.userLists.favourites.movies);
  const favActorIds = useSelector((s) => s.userLists.favourites.actors);

  const [moviePage, setMoviePage] = useState(1);
  const [actorPage, setActorPage] = useState(1);

  const [movies, setMovies] = useState(null);
  const [actors, setActors] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setMovies(null);
      const slice = favMovieIds.slice(
        (moviePage - 1) * PAGE_SIZE,
        moviePage * PAGE_SIZE
      );
      const details = await Promise.all(slice.map(getMovieDetails));
      if (!cancelled) setMovies(details);
    })();
    return () => {
      cancelled = true;
    };
  }, [favMovieIds, moviePage]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setActors(null);
      const slice = favActorIds.slice(
        (actorPage - 1) * PAGE_SIZE,
        actorPage * PAGE_SIZE
      );
      const details = await Promise.all(slice.map(getActorDetails));
      if (!cancelled) setActors(details);
    })();
    return () => {
      cancelled = true;
    };
  }, [favActorIds, actorPage]);

  return (
    <Tabs defaultActiveKey="movies">
      <Tabs.TabPane tab="Movies" key="movies">
        {!favMovieIds.length ? (
          <Empty description="No favourite movies" />
        ) : movies === null ? (
          <Spin />
        ) : (
          <MovieGrid
            movies={movies}
            clickable
            pagination={{
              current: moviePage,
              pageSize: PAGE_SIZE,
              total: favMovieIds.length,
              onChange: setMoviePage,
              showSizeChanger: false,
              style: { textAlign: "center", marginTop: 16 },
            }}
          />
        )}
      </Tabs.TabPane>

      <Tabs.TabPane tab="Actors" key="actors">
        {!favActorIds.length ? (
          <Empty description="No favourite actors" />
        ) : actors === null ? (
          <Spin />
        ) : (
          <ActorGrid
            actors={actors}
            pagination={{
              current: actorPage,
              pageSize: PAGE_SIZE,
              total: favActorIds.length,
              onChange: setActorPage,
              showSizeChanger: false,
              style: { textAlign: "center", marginTop: 16 },
            }}
          />
        )}
      </Tabs.TabPane>
    </Tabs>
  );
}
