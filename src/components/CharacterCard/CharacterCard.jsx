import { Link } from 'react-router-dom';


export default function CharacterCard({
    id,
    name,
    image,
    origin,
    status
}) {
    return (
        <article>
            <Link to={`/character/${id}`}>
                <img src={image} alt={name} />
                <h2>{name}</h2>
                <p>{origin.name}</p>
                <p>{status}</p>
            </Link>
        </article>
    )
}