import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import { fetchMovies } from './api/wookie';
import { Movie, MoviesOfGenre } from './types';
import './App.css';
import PageContainer from './components/PageContainer/PageContainer';
import { Row } from './components/Row/Row';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { sortMoviesByGenre } from './utils/movie-utils';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);

  function handleMovies(movies: Movie[]): void {
    setMovies(movies);
  }

  useEffect(() => {
    fetchMovies(handleMovies);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/movies/:movieId" element={<Movie />}>
        </Route>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </Router>
  );

  function Movie() {
    let { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | undefined>(undefined);

    useEffect(() => {
      if (movies?.length > 0) {
        const foundMovie = movies.find((movie) => movie.id === movieId);
        setMovie(foundMovie);
      }
    }, [movies]);

    return (
      <PageContainer>
        {movie && <MovieDetails movie={movie}></MovieDetails>}
      </PageContainer>
    );
  }

  function Home() {

    const [moviesOfGenre, setMoviesOfGenre] = useState<MoviesOfGenre[]>([]);

    useEffect(() => {
      setMoviesOfGenre(sortMoviesByGenre(movies));
    }, [movies]);

    return (
      <PageContainer>
        {moviesOfGenre.map((item, index) => {
          return (
            <Row moviesOfGenre={item} key={index}></Row>
          );
        })}
      </PageContainer>
    );
  }
}

export default App;
