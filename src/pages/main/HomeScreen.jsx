import { useEffect, useState } from "react";
import { Spin, App } from "antd";
import PopularMovies from "../../components/home/PopularMovies";
import PopularActors from "../../components/home/PopularActors";
import AboutSection from "../../components/home/AboutSection";
import {
  getTrendingToday,
  getPopularByYear,
  getPopularActors,
} from "../../api/movieApi";
import BannerSection from "../../components/Home/BannerSection";

const HomeScreen = () => {
  const [hero, setHero] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [popularActors, setPopularActors] = useState(null);
  const { message } = App.useApp();

  useEffect(() => {
    const load = async () => {
      try {
        const [trend, popMovies, popActors] = await Promise.all([
          getTrendingToday(),
          getPopularByYear(2025),
          getPopularActors(),
        ]);

        setHero(trend.results?.[0] ?? null);
        setPopularMovies(popMovies.results ?? []);
        setPopularActors(popActors.results ?? []);
      } catch (err) {
        message.error(`TMDB error: ${err.message}`);
        setPopularMovies([]);
        setPopularActors([]);
      }
    };
    load();
  }, [message]);

  const loading =
    hero === null || popularMovies === null || popularActors === null;

  return loading ? (
    <Spin />
  ) : (
    <>
      <BannerSection movie={hero} />

      <AboutSection />

      <PopularMovies movies={popularMovies} loading={popularMovies === null} />

      <PopularActors actors={popularActors} loading={popularActors === null} />
    </>
  );
};

export default HomeScreen;
