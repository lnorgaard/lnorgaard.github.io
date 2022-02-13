import { Movie, MoviesOfGenre } from '../types';
import { testMovie1, testMovie2 } from './mocks';
import { formatCast, formatYear, sortMoviesByGenre } from './movie-utils';

test('sortMoviesByGenre returns empty list if movies is empty list', () => {
    const movies: Movie[] = [];
    const moviesByGenre: MoviesOfGenre[] = sortMoviesByGenre(movies);
    expect(moviesByGenre).toEqual([])
});

test('sortMoviesByGenre creates list of 3 if movie has 3 genres', () => {
    const movies: Movie[] = [testMovie1];
    const moviesByGenre: MoviesOfGenre[] = sortMoviesByGenre(movies);

    const expectedMoviesByGenre: MoviesOfGenre[] = [
        {
            genre: 'Action',
            movies: [testMovie1]
        },
        {
            genre: 'Crime',
            movies: [testMovie1]
        },
        {
            genre: 'Drama',
            movies: [testMovie1]
        }
    ]
    expect(moviesByGenre).toEqual(expectedMoviesByGenre);
});

test('sortMoviesByGenre groups movies by genre and sorts the genres alphabetically', () => {
    const movies: Movie[] = [testMovie1, testMovie2];
    const moviesByGenre: MoviesOfGenre[] = sortMoviesByGenre(movies);

    const expectedMoviesByGenre: MoviesOfGenre[] = [
        {
            genre: 'Action',
            movies: [testMovie1, testMovie2]
        },
        {
            genre: 'Adventure',
            movies: [testMovie2]
        },
        {
            genre: 'Crime',
            movies: [testMovie1]
        },
        {
            genre: 'Drama',
            movies: [testMovie1]
        }
    ]
    expect(moviesByGenre).toEqual(expectedMoviesByGenre);
});

test('formatCast returns string with cast separated by commas', () => {
    const cast = testMovie1.cast;
    const formattedCast: string | undefined = formatCast(cast);
    expect(formattedCast).toEqual('Christian Bale, Heath Ledger, Aaron Eckhart');
});

test('formatCast returns empty string if list is 0 length', () => {
    const cast: string[] = [];
    const formattedCast: string | undefined = formatCast(cast);
    expect(formattedCast).toEqual('');
});

test('formatCast returns undefined if cast list is undefined', () => {
    const formattedCast: string | undefined = formatCast(undefined);
    expect(formattedCast).toBeUndefined();
});

test('formatYear returns year if available', () => {
    const year = testMovie1.released_on;
    const formattedYear: string | undefined = formatYear(year);
    expect(formattedYear).toEqual('2008');
});

test('formatYear returns undefined if release date length < 4', () => {
    const year = '';
    const formattedYear: string | undefined = formatYear(year);
    expect(formattedYear).toBeUndefined();
});

test('formatYear returns undefined if release date is undefined', () => {
    const formattedYear: string | undefined = formatYear(undefined);
    expect(formattedYear).toBeUndefined();
});