import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { getMovieByTitle } from "../../api/movieApi";
const HomePage = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    useEffect(()=>{
        const getData = async () => {
            const movie = await getMovieByTitle('Nobody');
            setMovie(movie);
        }
        getData();
    }, [])
    return <div>
        Home Page
        <NavLink onClick={()=>navigate('/auth', {replace: true})}>Logout</NavLink>
        {movie && <div>
            <p>{movie.Title}</p>
            <img src={movie.Poster}/>
            </div>
            }
    </div>
}

export default HomePage;