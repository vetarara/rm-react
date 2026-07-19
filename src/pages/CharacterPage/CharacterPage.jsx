import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCharacter, getEpisodes } from '../../api/characters';

import './CharacterPage.scss'

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
        return <p>Loading...</p>;
    }

    const statusClasses = {
        Alive: 'info__status--alive',
        Dead: 'info__status--dead',
        unknown: 'info__status--unknown',
    };

    return (
        <>
            <section className="info">
                <img className="info__img" src={character.image} alt={character.name} />
                <h1 className="info__name">{character.name}</h1>
                <p className={`info__status ${statusClasses[character.status]}`}>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Character's origin location: {character.origin.name}</p>
                <p>Character's last known location endpoint: {character.location.name}</p>
            </section>
            <section className="episodes">
                <h2>Episodes featuring the character: ({character.episode.length})</h2>
                <ol className="episodes__list">
                    {episodes.map(episode => (
                        <li key={episode.id}>
                            <strong>{episode.episode}</strong> — {episode.name} ({episode.air_date})
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}