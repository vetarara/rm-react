import { Link } from 'react-router-dom';

export default function CharacterCard({
    id,
    name,
    image,
    status,
}) {
    return (
        <article>
            <Link to={`/character/${id}`}>
                <img src={image} alt={name} />
                <h2>{name}</h2>
                <p>{status}</p>
                <span>{id}</span>
            </Link>
        </article>
    )
}