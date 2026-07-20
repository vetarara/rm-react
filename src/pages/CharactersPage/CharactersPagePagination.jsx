import CharacterList from '../../components/CharacterList/CharacterList';
import Pagination from '../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacters } from '../../api/characters';
import './CharactersPage.scss'

export default function CharactersPagePagination() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function loadCharacters() {
            const data = await getCharacters(page);

            setCharacters(data.results);
            setTotalPages(data.info.pages);
        }

        loadCharacters();
    }, [page]);

    function handlePrev() {
        setPage(prev => prev - 1);
    }

    function handleNext() {
        setPage(prev => prev + 1);
    }

    console.log(characters.length);
    console.log(characters);

    return (
        <>
            <Link className='other-pagination' to={`/`}>
            See the same page with alternative pagination
            </Link>
            <h1>All the characters</h1>
            <div className="characters-list">
                <CharacterList characters={characters} />
            </div>
            <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
                onPageChange={setPage}
            />
        </>
    );
}
