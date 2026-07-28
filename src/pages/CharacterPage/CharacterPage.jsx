import classNames from 'classnames';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCharacter } from '../../api/characters';
import { getEpisodes } from '../../api/episodes';

import './CharacterPage.scss'

export default function CharacterPage() {
    const { id } = useParams();

    const [character, setCharacter] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    async function loadCharacter() {
        try {
            const characterData = await getCharacter(id);

            if (!characterData) {
                setCharacter(null);
                setEpisodes([]);
                return;
            }

            setCharacter(characterData);

            if (!Array.isArray(characterData.episode) || characterData.episode.length === 0) {
                setEpisodes([]);
                return;
            }

            const ids = characterData.episode
                .map(url => url.split('/').pop())
                .join(',');

            const episodesData = await getEpisodes(ids);

            if (!episodesData) {
                setEpisodes([]);
                return;
            }

            setEpisodes(
                Array.isArray(episodesData)
                    ? episodesData
                    : [episodesData]
            );
        } catch (error) {
            console.error(error);
            setCharacter(null);
            setEpisodes([]);
        }
    }

    useEffect(() => {
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
                <h1 className="info__name">{character.name || 'Unknown'}</h1>
                <div className="info__wrapper">
                    <img className="info__img" src={character.image} alt={character.name || 'Unknown'} />
                    <div className="info__details">
                        {/* вместо */}
                        {/* <p className={`info__status ${statusClasses[character.status]}`}>{character.status}</p> */}

                        <p
                            className={classNames(
                                'info__status',
                                statusClasses[character.status]
                            )}
                        >
                            {character.status || 'Unknown'}
                        </p>

                        <p>Species: <span className="info__data">{character.species || 'Unknown'}</span></p>
                        <p>Gender: <span className="info__data">{character.gender || 'Unknown'}</span></p>
                        <p>Character's origin location: <span className="info__data">{character.origin?.name || 'Unknown'}</span></p>
                        <p>Character's last known location endpoint: <span className="info__data">{character.location?.name || 'Unknown'}</span></p>
                    </div>
                </div>
            </section>

            {episodes.length > 0 && (
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
            )}

        </>
    );
}