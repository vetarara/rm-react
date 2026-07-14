import { HashRouter, Routes, Route } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage';
import CharacterPage from './pages/CharacterPage';
import './App.css'

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={<CharactersPage />}
                />

                <Route
                    path="/character/:id"
                    element={<CharacterPage />}
                />
            </Routes>
        </HashRouter>
    );
}
