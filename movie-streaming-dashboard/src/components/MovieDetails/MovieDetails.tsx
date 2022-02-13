import { Movie } from '../../types';
import './MovieDetails.css';

type MovieDetailsProps = {
    movie: Movie;
}

export function MovieDetails(props: MovieDetailsProps) {

    const formattedCast = props.movie.cast.join(', ');

    return (
        <div className="MovieDetails-container">
            <div className="MovieDetails-picture-container">
                <img className="MovieDetails-picture" src={props.movie.poster} />
            </div>
            <div className="MovieDetails-details-container">
                <div className="MovieDetails-title-container">
                    <span className="MovieDetails-title">{props.movie.title}</span>
                    <div className="MovieDetails-rating">{props.movie.imdb_rating}</div>
                </div>
                <div className="MovieDetails-year-length-director">
                    {`${props.movie.released_on} | ${props.movie.length} | ${props.movie.director}`}
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