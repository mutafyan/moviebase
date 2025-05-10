import { Typography, Button, Skeleton } from 'antd';
import { poster } from '../api/movieApi';

const { Title, Paragraph } = Typography;

const Banner = ({ movie }) => {
  if (movie === null) { // no movie=>no banner
    return null;
  }
  if (!movie) {
    return <Skeleton active paragraph={{ rows: 6 }} style={{ height: 380 }} />;
  }
  return (
    <section
      style={{
        minHeight: 380,
        display: 'flex',
        alignItems: 'center',
        background: movie.backdrop_path
          ? `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.7)), url(${poster(
              movie.backdrop_path
            )}) center/cover`
          : '#222'
      }}
    >
      <div style={{ marginLeft: 60, maxWidth: 640, color: '#fff' }}>
        <Title style={{ color: '#fff' }}>{movie.title}</Title>
        <Paragraph style={{ color: '#fff' }} ellipsis={{ rows: 3 }}>
          {movie.overview || 'No overview available.'}
        </Paragraph>
        <Button type="primary">View details</Button>
      </div>
    </section>
  );
};

export default Banner;
