import { Movie, MoviesOfGenre } from "../types";

export function sortMoviesByGenre(movies: Movie[]): MoviesOfGenre[] {
    const dict: Record<string, Movie[]> = {};
    movies.forEach((movie) => {
        movie.genres.forEach((genre) => {
            if (!dict[genre]) {
                dict[genre] = [];
            }
            dict[genre].push(movie);
        })
    });
    let list: MoviesOfGenre[] = [];
    Object.keys(dict).forEach((genre) => {
        list.push({
            genre,
            movies: dict[genre]
        })
    });
    list = list.sort((a, b) => { return a.genre < b.genre ? -1 : 1 });
    return list;
}

export function formatCast(cast?: string[]): string | undefined {
    if (!cast) {
        return undefined;
    }
    return cast.join(', ');
}

export function formatYear(releasedOn?: string): string | undefined {
    if (!releasedOn) {
        return undefined;
    }
    if (releasedOn.length > 4) {
        return releasedOn.slice(0, 4);
    }
}