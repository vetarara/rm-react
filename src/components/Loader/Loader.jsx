import loaderGif from '../../assets/loader.gif';
import './Loader.scss'

export default function Header() {
    return (
        <section className="loader">
            <h2>Please, wait...</h2>
            <img
                className="loader__image"
                src={loaderGif}
                alt="Loading..."
            />
        </section>
    )
}