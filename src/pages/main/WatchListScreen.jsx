import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMovieDetails } from "../../api/movieApi";
import { Spin, Empty } from "antd";
import MovieGrid from "../../components/movies/MovieGrid";

const PAGE_SIZE = 20;

export function WatchlistScreen() {
  const watchIds = useSelector((s) => s.userLists.watchlist);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setMovies(null);
      const slice = watchIds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      const details = await Promise.all(slice.map((id) => getMovieDetails(id)));
      if (!cancelled) setMovies(details);
    })();
    return () => {
      cancelled = true;
    };
  }, [watchIds, page]);

  if (movies === null) return <Spin />;
  if (!watchIds.length) return <Empty description="Your watchlist is empty." />;

  return (
    <MovieGrid
      movies={movies}
      clickable
      pagination={{
        current: page,
        pageSize: PAGE_SIZE,
        total: watchIds.length,
        onChange: setPage,
        showSizeChanger: false,
        style: { textAlign: "center", marginTop: 16 },
      }}
    />
  );
}
