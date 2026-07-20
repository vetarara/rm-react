import CharacterList from '../../components/CharacterList/CharacterList';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacters } from '../../api/characters';
import './CharactersPage.scss'

export default function CharactersPage() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
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
