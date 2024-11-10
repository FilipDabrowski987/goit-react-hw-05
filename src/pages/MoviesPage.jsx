import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'https://api.themoviedb.org/3/search/movie?language=en-US&query=';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';

const MoviesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!searchQuery.trim()) {
            return;
        }
    
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(`${API_URL}${searchQuery}`, {
                headers: {
                    Authorization: API_ACCESS_TOKEN,
                },
            });
            setMovies(response.data.results);
            console.log(response.data.results)
        } catch (err) {
            console.error("Błąd podczas wyszukiwania:", err);
            setError('Nie udało się pobrać wyników. Spróbuj ponownie później.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="image" placeholder="wyszukaj film" value={searchQuery}
                    onChange={handleInputChange} />
                <button type="submit">Search</button>
            </form>

            { isLoading && <p>Ładowanie...</p>}
            { error && <p>{error}</p> }

        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default MoviesPage