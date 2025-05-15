import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Spin, Empty, App } from "antd";
import { searchMovies, getPopular } from "../../api/movieApi";
import MovieGrid from "../../components/movies/MovieGrid";

const PAGE_SIZE = 20;
const MAX_API_PAGES = 500; // TMDB limit

const MoviesScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || null;

  const urlPage = Math.min(
    Math.max(Number(searchParams.get("page") || 1), 1),
    MAX_API_PAGES
  );
  const [page, setPage] = useState(urlPage);
  useEffect(() => setPage(urlPage), [urlPage]);

  const [data, setData] = useState(null);
  const { message } = App.useApp();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setData(null);
      try {
        const res = query
          ? await searchMovies(query, urlPage)
          : await getPopular(urlPage);

        if (!cancelled) setData(res);
      } catch (err) {
        if (!cancelled) {
          message.error(err.message);
          setData({ results: [], total_results: 0, total_pages: 0 });
        }
      }
    })();

    return () => (cancelled = true);
  }, [query, urlPage, message]);

  const handlePageChange = (next) => {
    const safe = Math.min(next, MAX_API_PAGES);
    setPage(safe);

    const p = new URLSearchParams(searchParams);
    if (safe === 1) p.delete("page");
    else p.set("page", safe);
    setSearchParams(p, { replace: true });
  };

  if (data === null) return <Spin />;
  if (!data.results.length) return <Empty description="Nothing found." />;

  const effectivePages = Math.min(data.total_pages, MAX_API_PAGES);
  const totalItems = effectivePages * PAGE_SIZE;

  return (
    <>
      {query && <h2>Results for "{query}"</h2>}
      <MovieGrid
        movies={data.results}
        clickable
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total: totalItems,
          onChange: handlePageChange,
          showSizeChanger: false,
          style: { display: "flex", justifyContent: "center", padding: 10 },
        }}
      />
    </>
  );
};

export default MoviesScreen;
