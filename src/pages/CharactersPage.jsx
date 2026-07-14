import CharacterList from '../components/CharacterList/CharacterList';
import ShowMoreButton from '../components/ShowMoreButton/ShowMoreButton';
import { useEffect, useState } from 'react';
import { getCharacters } from '../api/characters';

export default function CharactersPage() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        async function loadCharacters() {
            const data = await getCharacters();

            setCharacters(data.results);
            setHasNextPage(data.info.next !== null);
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
        <div>
            <h1>Rick and Morty</h1>

            <p>Количество персонажей: {characters.length}</p>
            <CharacterList characters={characters} />
            {hasNextPage && (
                <ShowMoreButton
                    onClick={handleShowMore}
                />
            )}
        </div>
    );
}
