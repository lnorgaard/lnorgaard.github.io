import './MovieDetails.css';

type MovieDetailsProps = {
    photo: string;
    title: string;
    rating: string;
    year: string;
    length: string;
    director: string;
    cast: string[];
    description: string;
}

export function MovieDetails(props: MovieDetailsProps) {

    const formattedCast = props.cast.join(', ');

    return (
        <div className="MovieDetails-container">
            <div className="MovieDetails-picture-container">
                <image className="MovieDetails-picture" />
            </div>
            <div className="MovieDetails-details-container">
                <div className="MovieDetails-title-container">
                    <span className="MovieDetails-title">{props.title}</span>
                    <div className="MovieDetails-rating">{props.rating}</div>
                </div>
                <div className="MovieDetails-year-length-director">
                    {`${props.year} | ${props.length} | ${props.director}`}
                </div>
                <div className="MovieDetails-cast">
                    {`Cast: ${formattedCast}`}
                </div>
                <div className="MovieDetails-description">
                    {`Description: ${props.description}`}
                </div>
            </div>
        </div>
    );
}