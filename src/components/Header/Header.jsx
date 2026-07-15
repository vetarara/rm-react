import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Link to="/">
                <h1>Rick and Morty</h1>
            </Link>
        </header>
    )
}