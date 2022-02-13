import { render, screen } from '@testing-library/react';
import { Movie } from '../../types';
import { testMovie1 } from '../../utils/mocks';
import { MovieDetails } from './MovieDetails';

test('renders movie details', () => {
    const movie: Movie = testMovie1;
    render(<MovieDetails movie={movie} />);
    const linkElement = screen.getByText(testMovie1.title);
    expect(linkElement).toBeInTheDocument();
});