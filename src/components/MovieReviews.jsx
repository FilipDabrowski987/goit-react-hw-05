import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [movieReviews, setMovieReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}${movieId}/reviews`, {
          headers: { Authorization: API_ACCESS_TOKEN },
        });
        setMovieReviews(response.data.results);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Błąd podczas pobierania obsady');
      } finally {
        setIsLoading(false);
      }
    };
        fetchMovieReviews();
    }, [movieId]);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
      return (
        <div>
            {movieReviews.length === 0 ? (
                <p>Dla tego filmu nie ma jeszcze recenzji.</p>
            ) : (
                <ul>
                    {movieReviews.map((review) => (
                        <li key={review.id}>
                            <h4>{review.author}</h4>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieReviews