import { List, Empty } from "antd";
import ActorItem from "./ActorItem";

export default function ActorGrid({ actors = [], pagination = false }) {
  if (actors.length === 0) {
    return <Empty description="No actors to display." />;
  }

  return (
    <List
      grid={{
        gutter: 24,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 6,
      }}
      dataSource={actors}
      renderItem={(actor) => (
        <List.Item key={actor.id}>
          <ActorItem actor={actor} />
        </List.Item>
      )}
      pagination={pagination}
      locale={{ emptyText: "" }}
    />
  );
}
