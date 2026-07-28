const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/character?page=${page}`);

        if (!response.ok) {
            switch (response.status) {
                case 429:
                    throw new Error('The API rate limit has been exceeded. Please try again in a few seconds.');
                default:
                    throw new Error('Failed to load characters.');
            }
        }

        return response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                'Unable to connect to the server. Please check your connection and try again.',
                { cause: error }
            );
        }

        throw error;
    }
}

export async function getCharacter(id) {
    try {
        const response = await fetch(`${BASE_URL}/character/${id}`);

        if (!response.ok) {
            throw new Error('Не удалось получить персонажа');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка при получении персонажа:', error);
        throw error;
    }
}