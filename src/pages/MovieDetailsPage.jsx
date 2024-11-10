import { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import "./MovieDetailsPage.css"
// import MovieCast from '../components/MovieCast';
import MovieReviews from '../components/MovieReviews';

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRjMmI0NTkzZTg5Y2QxNTI5Yzg5ZjhiYjQ4MjhjNCIsIm5iZiI6MTczMTE1MjkyNC41MDc4MDYzLCJzdWIiOiI2NWVhMjI4NGQxMDBiNjAxODU0ZDM2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kt2G6GwG69PvYXpEM2qjAi_6mxELtRvgtQifvx-Lw9g';


const MovieDetailsPage = () => {

    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}${movieId}`, {
                    headers: {
                        Authorization: API_ACCESS_TOKEN,
                    },
                });
                setMovieDetails(response.data);
            } catch (error){
                console.error("Błąd podczas pobierania szczegółów filmu:", error);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

 if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
    <div>
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
                <h2>{movieDetails.title} ({movieDetails.release_date.slice(0, 4)})</h2>
                <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
                <h3>Genres</h3>
                <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            </div>
            </div>
            <div>
                <p>Additional information</p>
                <ul>
                    <li><Link to={`/movies/${movieId}/cast`}>Cast</Link></li>
                    <MovieReviews/>
                </ul>

                
                {/* <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                    </Link> */}


                {/* /movies/:movieId/cast – komponent MovieCast     */}
                {/* /movies/:movieId/reviews – komponent MovieReviews */}
            </div>
            <Outlet />
    </div>
    )
}

export default MovieDetailsPage