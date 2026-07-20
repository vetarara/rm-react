import { Link } from 'react-router-dom';
import './Header.scss'

export default function Header() {
    return (
        <header className="header">
            <Link className="header__link" to="/">
                <img className="header__logo" src={`${import.meta.env.BASE_URL}icons/rm-logo.svg`} alt="Rick and Morty wiki" />
            </Link>
        </header>
    )
}