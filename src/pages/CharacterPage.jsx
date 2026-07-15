import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCharacter, getEpisodes } from '../api/characters';

export default function CharacterPage() {
    const { id } = useParams();

    const [character, setCharacter] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        async function loadCharacter() {
            // получает персонажа
            const characterData = await getCharacter(id);
            setCharacter(characterData);

            // получает id всех эпизодов
            const ids = characterData.episode
                .map(url => url.split('/').pop())
                .join(',');

            // получает информацию об эпизодах
            const episodesData = await getEpisodes(ids);

            setEpisodes(
                Array.isArray(episodesData)
                    ? episodesData
                    : [episodesData]
            );
        }

        loadCharacter();
    }, [id]);

    if (!character) {
        return <p>Загрузка...</p>;
    }

    return (
        <>
            <section>
                <h1>{character.name}</h1>

                <img src={character.image} alt={character.name} />
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Character's origin location: {character.origin.name}</p>
                <p>Character's last known location endpoint: {character.location.name}</p>
            </section>
            <section>
                <h2>Episodes featuring the character: ({character.episode.length})</h2>
                <ul>
                    {episodes.map(episode => (
                        <li key={episode.id}>
                            <strong>{episode.episode}</strong> — {episode.name} ({episode.air_date})
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}