import Logo from '../../assets/icons/rm-logo.svg?react';
import { Link } from 'react-router-dom';
import './Header.scss'

export default function Header() {
    return (
        <header className="header">
            <Link className="header__link" to="/">
                <Logo className="header__logo" />
            </Link>
        </header>
    )
}