import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCharacter } from '../api/characters';
// позволяет получить id из адресной строки

export default function CharacterPage() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        async function loadCharacter() {
            const data = await getCharacter(id);

            setCharacter(data);
        }

        loadCharacter();
    }, []);

    if (!character) {
    return <p>Загрузка...</p>;
}

    return (
        <>
        <section>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} />
            <p>Status of the character: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Type: {character.type}</p>
            <p>Gender: {character.gender}</p>
            <p>Character's origin location: {character.origin.name}</p>
            <p>Character's last known location endpoint: {character.location.name}</p>
        </section>
        <section>
            <h2>Episodes ({character.episode.length})</h2>
            {character.episode}
        </section>
        </>
    );
}