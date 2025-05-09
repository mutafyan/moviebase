import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { getMovieByTitle } from "../../api/movieApi";
import { logout } from "../../api/authApi";
import {App} from 'antd';
const HomeScreen = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const { message } = App.useApp();

    useEffect(()=>{
        const getData = async () => {
            const movie = await getMovieByTitle('Nobody');
            setMovie(movie);
        }
        getData();
    }, [])

    const onLogout = async () => {
        const loggedOut = await logout();
        if(loggedOut) {
            message.success('Logged out', 2)
            navigate('/login', {replace: true});
        } else {
            console.log("Couldn't logout")
        }
    }
    return <div>
        Home Page
        <NavLink onClick={onLogout}>Logout</NavLink>
        {movie && <div>
            <p>{movie.Title}</p>
            <img src={movie.Poster}/>
            </div>
            }
    </div>
}

export default HomeScreen;