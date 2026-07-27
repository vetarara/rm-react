const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getEpisodes(ids) {
    try {
        const response = await fetch(`${BASE_URL}/episode/${ids}`);

        if (!response.ok) {
            throw new Error('Не удалось получить эпизоды');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка при получении эпизодов:', error);
        throw error;
    }

}