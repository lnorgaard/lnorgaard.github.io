import { Link } from 'react-router-dom';
import { MoviesOfGenre } from '../../types';
import './Row.css';

type RowProps = {
    moviesOfGenre: MoviesOfGenre;
}

export function Row(props: RowProps) {
    return (
        <div className="Row-container">
            <div className="Row-genre-container">
                <span className="Row-genre">{props.moviesOfGenre.genre}</span>
            </div>
            <div className="Row-thumbnails-container">
                {props.moviesOfGenre.movies.map((item, index) => {
                    return (
                        <Link className="Row-thumbnail" to={`/movies/${item.id}`} key={index} title={item.title}>
                            <img height="150" src={item.backdrop}></img>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}