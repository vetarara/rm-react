export default function CharacterCard({
    id,
    name,
    image,
    status,
}) {
    return (
        <article>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{status}</p>
            <span>{id}</span>
        </article>
    )
}