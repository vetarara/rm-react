import { Link } from 'react-router-dom';
import './Footer.scss'

export default function Footer() {
    return (
        <footer className="footer">
            <p>Made with</p>
            <Link className="footer__link" to="https://rickandmortyapi.com/">
                The Rick and Morty API
            </Link>
        </footer>
    )
}