// получение данных и хранение состояния
import CharacterList from '../components/CharacterList/CharacterList';
import { useEffect, useState } from 'react';
import { getCharacters } from '../api/characters';

export default function CharactersPage() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function loadCharacters() {
            const data = await getCharacters();

            console.log(data);

            setCharacters(data.results);
        }

        loadCharacters();
    }, []);

    return (
        <div>
            <h1>Rick and Morty</h1>

            <p>Количество персонажей: {characters.length}</p>
            <CharacterList characters={characters} />
        </div>
    );
}