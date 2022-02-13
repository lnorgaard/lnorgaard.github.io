import { Link } from 'react-router-dom';
import { Movie } from '../../types';
import './Row.css';

type RowProps = {
    genre: string;
    movies: Movie[];
}

export function Row(props: RowProps) {
    return (
        <div className="Row-container">
            <div className="Row-genre-container">
                <span className="Row-genre">{props.genre}</span>
            </div>
            <div className="Row-thumbnails-container">
                {props.movies.map((item, index) => {
                    return (
                        <Link className="Row-thumbnail" to={`/movies/${item.id}`} key={index}>
                            <img height="150" src={item.backdrop}></img>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}