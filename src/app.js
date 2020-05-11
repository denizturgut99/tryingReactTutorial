import React, { useState, lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import ThemeContext from './themeContext';

const Details = lazy(() => import('./details'));
const SearchParams = lazy(() => import('./searchParams'));

const App = () => {
    const themeHook = useState('black');
    return (
        <React.StrictMode>
            <ThemeContext.Provider value={themeHook}>
                <div>
                    <header>
                        <Link to="/">Trying React</Link>
                    </header>
                    <Suspense fallback={<h1>Loading route...</h1>}>
                        <Router>
                            <SearchParams path="/"></SearchParams>
                            <Details path="/details/:id"></Details>
                        </Router>
                    </Suspense>
                </div>
            </ThemeContext.Provider>
        </React.StrictMode>
    );
};

// overwrites what is inside the div
render(<App />, document.getElementById('root'));
