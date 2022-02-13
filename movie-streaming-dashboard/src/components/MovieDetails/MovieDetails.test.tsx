import { render, screen } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';

test('renders movie details', () => {
    render(<MovieDetails title='Test Title' photo={''} rating={''} year={''} length={''} director={''} cast={[]} description={''} />);
    const linkElement = screen.getByText(/Test Title/i);
    expect(linkElement).toBeInTheDocument();
});