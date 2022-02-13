import { render, screen } from '@testing-library/react';
import { Movie } from '../../types';
import { MovieDetails } from './MovieDetails';

test('renders movie details', () => {
    const movie: Movie = {
        backdrop: '',
        cast: [],
        classification: '',
        director: '',
        genres: [],
        id: '',
        imdb_rating: 0,
        length: '',
        overview: '',
        poster: '',
        released_on: '',
        slug: '',
        title: 'Test Title'
    };
    render(<MovieDetails movie={movie} />);
    const linkElement = screen.getByText(/Test Title/i);
    expect(linkElement).toBeInTheDocument();
});