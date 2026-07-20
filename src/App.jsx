import { HashRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import CharactersPagePagination from './pages/CharactersPage/CharactersPagePagination';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import Footer from './components/footer/footer';

export default function App() {
    return (
        <HashRouter>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<CharactersPage />}
                    />

                    <Route
                        path="/alt-pagination"
                        element={<CharactersPagePagination />}
                    />

                    <Route
                        path="/character/:id"
                        element={<CharacterPage />}
                    />
                </Routes>
            </main>
            <Footer />
        </HashRouter>
    );
}
