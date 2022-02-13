import { Movie } from '../../types';
import { formatCast, formatYear } from '../../utils/movie-utils';
import './MovieDetails.css';

type MovieDetailsProps = {
    movie: Movie;
}

export function MovieDetails(props: MovieDetailsProps) {

    const formattedCast = formatCast(props.movie.cast);
    const formattedYear = formatYear(props.movie.released_on);

    return (
        <div className="MovieDetails-container">
            <div className="MovieDetails-picture-container">
                <img className="MovieDetails-picture" src={props.movie.poster} />
            </div>
            <div className="MovieDetails-details-container">
                <div className="MovieDetails-title-container">
                    <span className="MovieDetails-title">{props.movie.title} ({props.movie.imdb_rating})</span>
                </div>
                <div className="MovieDetails-year-length-director">
                    {`${formattedYear} | ${props.movie.length} | ${props.movie.director}`}
                </div>
                <div className="MovieDetails-cast">
                    {`Cast: ${formattedCast}`}
                </div>
                <div className="MovieDetails-description">
                    {`Description: ${props.movie.overview}`}
                </div>
            </div>
        </div>
    );
}