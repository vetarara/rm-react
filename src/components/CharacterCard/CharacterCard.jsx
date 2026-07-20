import { Link } from 'react-router-dom';
import './CharacterCard.scss'


export default function CharacterCard({
    id,
    name,
    image,
    location,
    status
}) {
    const statusClasses = {
        Alive: 'character-card__status--alive',
        Dead: 'character-card__status--dead',
        unknown: 'character-card__status--unknown',
    };

    return (
        <article className='character-card'>
            <Link className='character-card__link' to={`/character/${id}`}>
                <img className='character-card__img' src={image} alt={name} />
                <div className="character-card__details">
                    <h2 className='character-card__name'>{name}</h2>
                    <p className={`character-card__status ${statusClasses[status]}`}>{status}</p>
                    <p className='character-card__last-location'>Last known location: {location.name}</p>
                </div>
            </Link>
        </article>
    )
}