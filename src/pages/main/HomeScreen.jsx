import { useEffect, useState } from "react";
import { Layout, Spin, App } from "antd";
import NavBar from "../../components/NavBar";
import Banner from "../../components/Banner";
import PopularMovies from "../../components/PopularMovies";
import { getTrendingToday, getPopularByYear } from "../../api/movieApi";

const { Content } = Layout;

const HomeScreen = () => {
  const [hero, setHero] = useState(null);
  const [popular, setPopular] = useState(null);
  const { message } = App.useApp();

  useEffect(() => {
    const load = async () => {
      try {
        const [trend, pop] = await Promise.all([
          getTrendingToday(),
          getPopularByYear(2025), // run 2 tasks as iterable
        ]);
        setHero(trend.results?.[0] ?? null);
        setPopular(pop.results ?? []);
      } catch (err) {
        message.error(`TMDB error: ${err.message}`);
        setPopular([]);
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <NavBar />
      <Content className="site-content">
        {!hero && popular === null ? (
          <Spin fullscreen />
        ) : (
          <>
            <section style={{ padding: "40px 30px" }}>
              <h2>What is MovieBase?</h2>
              <p>
                MovieBase is a lightweight IMDb-style catalogue powered by&nbsp;
                TMDB. Browse, search and save your favourite titles without the
                clutter.
              </p>
            </section> 
            <Banner movie={hero} />
            <PopularMovies movies={popular} loading={popular === null} />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default HomeScreen;
