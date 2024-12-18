import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';

const MovieCast = () => {
    const { movieId } = useParams();
    const [movieCast, setMovieCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

       useEffect(() => {
           const fetchMovieCast = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_URL}${movieId}/credits`, {
                    headers: {
                        Authorization: API_ACCESS_TOKEN,
                    },
                });
                setMovieCast(response.data.cast);
            // eslint-disable-next-line no-unused-vars
            } catch (error){
                setError('Błąd podczas pobierania obsady');
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieCast();
       }, [movieId]);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
        
    return (
        <div>
            <ul>
                {movieCast.map((actor) => (
                    <li key={actor.cast_id}>
                        {actor.profile_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} 
                                alt={`${actor.name}`} 
                                width="100"
                                height="150"
                            />
                        ) : (
                            <div>No Image</div>
                        )}
                        <h4>{actor.name}</h4>
                        <p>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieCast