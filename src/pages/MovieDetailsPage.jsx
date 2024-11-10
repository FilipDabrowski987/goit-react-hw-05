import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
// import MovieCast from '../components/MovieCast';
// import MovieReviews from '../components/MovieReviews';
import "./MovieDetailsPage.css"

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';


const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
     
    useEffect(() => {
        const fetchMovieDetails = async () => {
        setIsLoading(true);
        try {
        const response = await axios.get(`${API_URL}${movieId}`, {
            headers: {
                Authorization: API_ACCESS_TOKEN,
            },
        });
        setMovieDetails(response.data);
        // eslint-disable-next-line no-unused-vars
        } catch (error){
        setError('Błąd podczas pobierania szczegółów filmu');
        } finally {
        setIsLoading(false);
      }
    };
        fetchMovieDetails();
    }, [movieId]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
        <button onClick={() => navigate(location.state?.from || '/')}>Go Back</button>
            <div className='movie-details-container'>
            <div>
                {movieDetails.poster_path && (
                <img className='movie-details-poster'            
                    src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}            
                    alt={movieDetails.title}
                />
                )}
            </div>
            <div>
                <h2>{movieDetails.title} ({movieDetails.release_date ? movieDetails.release_date.slice(0, 4) : ''})</h2>
                <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
                <h3>Genres</h3>
                <p>{movieDetails.genres ? movieDetails.genres.map(genre => genre.name).join(', ') : ''}</p>
            </div>
            </div>
            <div>
                <p>Additional information</p>
                <Link to="cast">Cast</Link><br/>
                <Link to="reviews">Reviews</Link>
            </div>
            <Outlet />
    </div>
    )
}

export default MovieDetailsPage