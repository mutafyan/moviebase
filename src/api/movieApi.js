const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB = "https://api.themoviedb.org/3";

// helper to handle errors
async function fetchJson(url) {
  const res = await fetch(`${url}&api_key=${API_KEY}`);
  if (!res.ok) throw new Error(`http status ${res.status}`);
  const data = await res.json();
  if (data.success === false) throw new Error(data.status_message);
  return data;
}

export const banner = (path) => `https://image.tmdb.org/t/p/w780${path}`;
export const poster = (path) => `https://image.tmdb.org/t/p/w500${path}`;

export const getMovieByTitle = async (title) =>
  (await fetchJson(`${TMDB}/search/movie?query=${encodeURIComponent(title)}`))
    .results?.[0];

export const getTrendingToday = () =>
  fetchJson(`${TMDB}/trending/movie/day?language=en-US`);

export const getPopularByYear = (year = new Date().getFullYear()) =>
  fetchJson(
    `${TMDB}/discover/movie?primary_release_year=${year}&sort_by=popularity.desc`
  );

export const getPopular = () =>
  fetchJson(`${TMDB}/movie/popular?language=en-US`);
