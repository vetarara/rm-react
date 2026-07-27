import CharacterList from '../../components/CharacterList/CharacterList';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacters } from '../../api/characters';
import './CharactersPage.scss'

export default function CharactersPage() {
    // хранит массив загруженных персонажей
    const [characters, setCharacters] = useState([]);
    // Хранит номер текущей страницы API. При первой загрузке - 1. После нажатия "Show more" становится 2, 3, 4 и т.д.
    const [page, setPage] = useState(1);
    // Показывает, существует ли следующая страница. Используется для отображения кнопки "Show more"
    const [hasNextPage, setHasNextPage] = useState(true);
    // Хранит общее количество персонажей, которое приходит от API
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        async function loadCharacters() {
            const data = await getCharacters();

            setCharacters(data.results);
            setHasNextPage(data.info.next !== null);
            setTotalCount(data.info.count);
        }

        loadCharacters();
    }, []);

    async function handleShowMore() {
        const nextPage = page + 1;

        const data = await getCharacters(nextPage);

        setCharacters(prevCharacters => [
            ...prevCharacters,
            ...data.results,
        ]);

        setPage(nextPage);

        setHasNextPage(data.info.next !== null);
    }

    console.log(characters.length);
    console.log(characters);

    return (
        <>
            <Link className='other-pagination' to={`/alt-pagination`}>
                See the same page with classic pagination
            </Link>
            <h1>All the characters</h1>
            <div className="characters-list">
                <CharacterList characters={characters} />
            </div>
            <div className="characters-more">
                <p className="characters-count">{characters.length} / {totalCount}</p>
                {hasNextPage && (
                    <ShowMoreButton
                        onClick={handleShowMore}
                    />
                )}
            </div>
        </>
    );
}
