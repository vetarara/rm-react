import CharacterCard from '../CharacterCard/CharacterCard';

function CharacterList({ characters }) {
    return (
        <>

            <h2>Карточек: {characters.length}</h2>
            
            {characters.map(character => (
                <CharacterCard
                    key={character.id}
                    {...character}
                />
            ))}
        </>
    );
}

export default CharacterList;