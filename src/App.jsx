import { HashRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import CharacterPage from './pages/CharacterPage/CharacterPage';
// import './App.css'

export default function App() {
    return (
        <HashRouter>
            <Header />

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
