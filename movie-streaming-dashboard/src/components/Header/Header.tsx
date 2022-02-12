import './Header.css';

type HeaderProps = {
    title: string;
}

export function Header(props: HeaderProps) {
    return (
        <div className="Header-container">
            <div className="Header-title-container">
                <span className="Header-title">{props.title}</span>
            </div>
            <div className="Header-search-container">
                <input className="Header-search" type="text" placeholder="Search..." />
            </div>
        </div>
    );
}