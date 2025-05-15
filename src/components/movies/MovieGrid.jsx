import { List, Empty } from "antd";
import MovieItem from "./MovieItem";

export default function MovieGrid({
  movies = [],
  clickable = false,
  pagination = false,
}) {
  if (movies.length === 0) {
    return <Empty description="No movies to display." />;
  }
  return (
    <div style={{ width: "100%" }}>
      <List
        grid={{
          gutter: 24,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 5,
        }}
        dataSource={movies}
        renderItem={(m) => (
          <List.Item key={m.id}>
            <MovieItem movie={m} clickable={clickable} />
          </List.Item>
        )}
        pagination={pagination}
      />
    </div>
  );
}
