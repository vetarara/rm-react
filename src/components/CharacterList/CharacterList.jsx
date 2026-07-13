// задача этого файла - отобразить список

function CharacterList({ characters }) {
    return (
        <>
            {characters.map(character => (
                <p key={character.id}>
                    {character.name}
                </p>
            ))}
        </>
    );
}

export default CharacterList;