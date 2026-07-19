import { Link } from 'react-router-dom';
import './Header.scss'

export default function Header() {
    return (
        <header>
            <Link className="header__link" to="/">
                <h1>Rick and Morty</h1>
            </Link>
        </header>
    )
}