import React, { useState } from 'react';
import SearchParams from './searchParams';
import { Router, Link } from '@reach/router';
import Details from './details';
import ThemeContext from './themeContext';

const App = () => {
    const themeHook = useState('black');
    return (
        <React.StrictMode>
            <ThemeContext.Provider value={themeHook}>
                <div>
                    <header>
                        <Link to="/">Trying React</Link>
                    </header>
                    <Router>
                        <SearchParams path="/"></SearchParams>
                        <Details path="/details/:id"></Details>
                    </Router>
                </div>
            </ThemeContext.Provider>
        </React.StrictMode>
    );
};

export default App;
