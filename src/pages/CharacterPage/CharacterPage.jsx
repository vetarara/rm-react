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
                <h1 className="info__name">{character.name}</h1>
                <div className="info__wrapper">
                    <img className="info__img" src={character.image} alt={character.name} />
                    <div className="info__details">
                        <p className={`info__status ${statusClasses[character.status]}`}>{character.status}</p>
                        <p>Species: <span className="info__data">{character.species}</span></p>
                        <p>Gender: <span className="info__data">{character.gender}</span></p>
                        <p>Character's origin location: <span className="info__data">{character.origin.name}</span></p>
                        <p>Character's last known location endpoint: <span className="info__data">{character.location.name}</span></p>
                    </div>
                </div>
            </section>
            <section className="episodes">
                <h2>Episodes featuring the character: {character.episode.length}</h2>
                <ol className="episodes__list">
                    {episodes.map(episode => (
                        <li className="episodes__item" key={episode.id}>
                            <p>{episode.episode}</p>
                            <p>{episode.name}</p>
                            <p>({episode.air_date})</p>
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}