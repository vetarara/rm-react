// получение данных и хранение состояния
import CharacterList from '../components/CharacterList/CharacterList';
import { useEffect, useState } from 'react';
import { getCharacters } from '../api/characters';


export default function CharactersPage() {
    // хуки можно вызывать только внутри компонента.

    // characters — массив, который хранится в useState, при первой загрузке в нём 20 персонажей
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    // когда API перестанет возвращать next, кнопку можно скрыть.

    useEffect(() => {
        async function loadCharacters() {
            const data = await getCharacters(page);

            console.log(data);

            // prevCharacters - предыдущее значение состояния
            setCharacters(prevCharacters => [
                ...prevCharacters,
                ...data.results,
            ]);
            // API возвращает data.info.next
            // Если следующая страница есть, там будет ссылка. Если нет — null

            setHasNextPage(data.info.next !== null);
            // пока есть следующая страница — кнопка показывается
            // когда API сообщит, что страниц больше нет — кнопка автоматически исчезнет.
        }

        loadCharacters();
    }, [page]);

    function handleShowMore() {
        setPage(prevPage => prevPage + 1);
    }

    console.log(characters.length);
    console.log(characters);

    return (
        <div>
            <h1>Rick and Morty</h1>

            <p>Количество персонажей: {characters.length}</p>
            <CharacterList characters={characters} />
            {hasNextPage && (
                <button onClick={handleShowMore}>
                    Показать ещё
                </button>
            )}
        </div>
    );
}

// после первого запроса: characters
//  data.results - вторая страница
// в JS было бы
// const newArray = [
//     ...characters,
//     ...data.results
// ];