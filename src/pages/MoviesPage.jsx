import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';

const API_URL = 'https://api.themoviedb.org/3/search/movie?language=en-US&query=';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        const searchQuery = searchParams.get('query');
        if (!searchQuery) return;

        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_URL}${searchQuery}`, {
                    headers: {
                        Authorization: API_ACCESS_TOKEN,
                    },
                });
                setMovies(response.data.results);
                setSearchPerformed(true);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Nie udało się pobrać wyników. Spróbuj ponownie później.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setSearchParams({ query });
            setSearchPerformed(false);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="query"
                    placeholder="wyszukaj film"
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>

            {isLoading && <p>Ładowanie...</p>}
            {error && <p>{error}</p>}
            {!isLoading && searchPerformed && movies.length === 0 && (
                <p>Nie znaleziono żadnych wyników.</p>
            )}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    )
}

export default MoviesPage