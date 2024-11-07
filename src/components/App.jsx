import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import MovieCast from "./MovieCast";
import MovieReviews from "./MovieReviews";
import Navigation from "./Navigation";

export const App = () => {
  return (
    <div>
    <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                  <Route path="cast" element={<MovieCast />} />
                  <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App