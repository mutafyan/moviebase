const BASE_URL = 'https://www.omdbapi.com/?apikey=bc19ba30';
export const getMovieByTitle = async (title) => {
    const res = await fetch(`${BASE_URL}&t=${title}`);
    const resJSON = await res.json();
    console.log(resJSON);
    return resJSON;
}