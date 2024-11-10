import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';

const MovieReviews = () => {
 const { movieId } = useParams();
    const [movieReviews, setMovieReviews] = useState(null);

       useEffect(() => {
        const fetchMovieReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}${movieId}/reviews?language=en-US&page=1`, {
                    headers: {
                        Authorization: API_ACCESS_TOKEN,
                    },
                });
                setMovieReviews(response.data.results);
            } catch (error){
                console.error("Błąd podczas pobierania obsady:", error);
            }
        };
        fetchMovieReviews();
       }, [movieId]);
    
    if (!movieReviews) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div>
            <ul>
                {movieReviews.map((review) => (
                    <li key={review.id}>
                        <h4>{review.author}</h4>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieReviews