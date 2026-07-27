const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/character?page=${page}`);

        if (!response.ok) {
            throw new Error('Не удалось получить список персонажей');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка при получении персонажей:', error);
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