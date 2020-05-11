import React, { useState } from 'react';
import { render } from 'react-dom';
import SearchParams from './searchParams';
import { Router } from '@reach/router';
import Details from './details';
import ThemeContext from './themeContext';
import Navbar from './navBar';

const App = () => {
    const themeHook = useState('black');
    return (
        <React.StrictMode>
            <ThemeContext.Provider value={themeHook}>
                <div>
                    <Navbar></Navbar>
                    <Router>
                        <SearchParams path="/"></SearchParams>
                        <Details path="/details/:id"></Details>
                    </Router>
                </div>
            </ThemeContext.Provider>
        </React.StrictMode>
    );
};

// overwrites what is inside the div
render(<App />, document.getElementById('root'));
