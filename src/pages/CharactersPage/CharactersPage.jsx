import CharacterList from '../../components/CharacterList/CharacterList';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import Loader from '../../components/Loader/Loader';
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
    // До запроса мы не можем быть уверены, что следующая страница есть. Поэтому логичнее не true, а false
    const [hasNextPage, setHasNextPage] = useState(false);
    // Хранит общее количество персонажей, которое приходит от API
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    async function loadCharacters() {
        try {
            setIsLoading(true);

            const data = await getCharacters();

            // это избыточно, т.к. в getCharacters() выполнится throw new Error(...)?
            if (!data?.results || !data?.info) {
                return;
            }

            setCharacters(data.results);
            setHasNextPage(data.info.next !== null);
            setTotalCount(data.info.count);
        } catch (error) {
            console.error('Failed to load characters:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadCharacters();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    async function handleShowMore() {
        try {
            const nextPage = page + 1;

            const data = await getCharacters(nextPage);

            if (!data?.results) {
                return;
            }

            setCharacters(prevCharacters => [
                ...prevCharacters,
                ...data.results,
            ]);

            setPage(nextPage);
            setHasNextPage(data.info.next !== null);
        } catch (error) {
            console.error('Failed to load more characters:', error);
        }
    }

    return (
        <>
            <Link className='other-pagination' to={`/alt-pagination`}>
                See the same page with classic pagination
            </Link>
            <h1>All the characters</h1>
            <div className="characters-list">
                {characters.length > 0 ? (
                    <CharacterList characters={characters} />
                ) : (
                    <p>No characters found :c</p>
                )}
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
