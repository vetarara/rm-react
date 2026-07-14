import CharacterCard from '../CharacterCard/CharacterCard';

// function CharacterList(props) {
//     const characters = props.characters;
// }

function CharacterList({ characters }) {
    return (
        <>

            <h2>Карточек: {characters.length}</h2>
            
            {characters.map(character => (
                <CharacterCard
                    key={character.id}
                    // {id={character.id}
                    // name={character.name}
                    // image={character.image}
                    // status={character.status}}
                    {...character}
                />
            ))}
        </>
    );
}

export default CharacterList;