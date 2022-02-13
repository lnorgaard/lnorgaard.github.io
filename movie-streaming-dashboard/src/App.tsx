import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";

import './App.css';
import { Header } from './components/Header/Header';
import PageContainer from './components/PageContainer/PageContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<Movies />}>
        </Route>
        <Route path="/movies/:movieId" element={<Movie />}>
        </Route>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </Router>
  );

  function Movies() {
    return (
      <PageContainer>
        <div>movies</div>
      </PageContainer>
    );
  }

  function Movie() {
    let { movieId } = useParams();
    console.log('movieId', movieId);
    return (
      <PageContainer>
        <div>movieee</div>
        <div>{movieId}</div>
      </PageContainer>
    );
  }

  function Home() {
    return (
      <PageContainer>
        <div>home</div>
      </PageContainer>
    );
  }
}

export default App;
