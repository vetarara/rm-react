import CharacterCard from '../CharacterCard/CharacterCard';
import './CharacterList.scss'

function CharacterList({ characters }) {
    return (
        <>            
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