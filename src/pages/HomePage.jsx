import { useEffect, useState } from 'react';
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
                <li key={movie.id}>
                    <p>{movie.title}</p>
                    {/* <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} /> */}
                </li>
            ))}
        </ul>
    )
}

export default HomePage