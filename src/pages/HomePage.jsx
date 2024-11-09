import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./HomePage.css"

const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';

const HomePage = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: API_ACCESS_TOKEN,
                    },
                });
                setMovies(response.data.results);
            } catch (error){
                console.error("Błąd podczas pobierania popularnych filmów:", error);
            }
        };
        fetchPopularMovies();
    }, []);

    return (
        <ul className='video-gallery'>
            {movies.map(movie => (
                <li key={movie.id} className='video-gallery-item'>
                    <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default HomePage