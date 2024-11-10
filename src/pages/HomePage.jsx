import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';
import "./HomePage.css"

const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: API_ACCESS_TOKEN,
                    },
                });
                setMovies(response.data.results);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Błąd podczas pobierania popularnych filmów');
            } finally {
            setIsLoading(false);
            }
        };
        fetchPopularMovies();
    }, []);

    return (
        <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No movies available</p>
      )}
    </div>
    )
}

export default HomePage