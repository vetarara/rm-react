import CharacterList from '../../components/CharacterList/CharacterList';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacters } from '../../api/characters';
import './CharactersPage.scss'

export default function CharactersPagePagination() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // состояние загрузки
    const [isLoading, setIsLoading] = useState(true);

    // создаётся после каждого рендера, но вызывается только тогда, когда изменяется page
    async function loadCharacters() {
        try {
            const data = await getCharacters(page);

            if (!data?.results || !data?.info) {
                return;
            }

            setCharacters(data.results);
            setTotalPages(data.info.pages);
        } catch (error) {
            console.error('Failed to load characters:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadCharacters();
    }, [page]);

    function handlePrev() {
        setPage(prev => prev - 1);
    }

    function handleNext() {
        setPage(prev => prev + 1);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Link className='other-pagination' to={`/`}>
                See the same page with alternative pagination
            </Link>
            <h1>All the characters</h1>
            <div className="characters-list">
                {characters.length > 0 ? (
                    <CharacterList characters={characters} />
                ) : (
                    <p>No characters found.</p>
                )}
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
