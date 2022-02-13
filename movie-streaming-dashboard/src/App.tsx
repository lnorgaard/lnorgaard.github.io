import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import { fetchMovies } from './api/wookie';
import { Movie } from './types';
import './App.css';
import PageContainer from './components/PageContainer/PageContainer';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);

  function handleMovies(movies: Movie[]): void {
    setMovies(movies);
  }

  useEffect(() => {
    fetchMovies(handleMovies);
  });

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
    console.log('movieId', movieId);
    return (
      <PageContainer>
        <div>movie</div>
        <div>{movieId}</div>
      </PageContainer>
    );
  }

  function Home() {
    return (
      <PageContainer>
        <div>
          {movies.map((item, index) => {
            return <img height="100" src={item.backdrop} key={index}></img>
          })}
        </div>
      </PageContainer>
    );
  }
}

export default App;
