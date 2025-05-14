import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { List, Card, Input, Spin, Empty, App } from "antd";
import { searchMovies, getPopular, poster } from "../../api/movieApi";
import MovieItem from "../../components/movies/MovieItem";

const MoviesScreen = () => {
  const [params] = useSearchParams();
  const query = params.get("query")?.trim() || null;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(null);
  const { message } = App.useApp();
  const navigate = useNavigate();
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setMovies(null);
      try {
        const data = query
          ? await searchMovies(query, page)
          : await getPopular(page);
        if (!cancelled) setMovies(data.results);
      } catch (err) {
        if (!cancelled) {
          message.error(err.message);
          setMovies([]);
        }
      }
    };
    load();
    return () => (cancelled = true);
  }, [query, page, message]);

  if (movies === null) return <Spin fullscreen />;

  if (!movies.length) return <Empty description="Nothing found." />;

  return (
    <>
      {query && <h2>Results for "{query}"</h2>}
      <List
        grid={{ gutter: 24, column: 5 }}
        dataSource={movies}
        renderItem={(m) => (
          <List.Item key={m.id}>
            <MovieItem movie={m} touchable={true}/>
          </List.Item>
        )}
        pagination={{
          current: page,
          onChange: setPage,
          total: 500 * 20, // TMDB gives 500 pages
          showSizeChanger: false,
        }}
      />
    </>
  );
};

export default MoviesScreen;
