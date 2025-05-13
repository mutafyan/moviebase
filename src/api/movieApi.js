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

export const searchMovies = (query, page = 1) =>
  fetchJson(
    `${TMDB}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );

export const getMovieDetails = (id) =>
  fetchJson(`${TMDB}/movie/${id}?append_to_response=videos,credits,images`);

export const getPopular = (page = 1) =>
  fetchJson(`${TMDB}/movie/popular?page=${page}`);

export const getPopularActors = (page = 1) =>
  fetchJson(`${TMDB}/person/popular?page=${page}&language=en-US`);
