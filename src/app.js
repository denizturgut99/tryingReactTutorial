import React from 'react';
import { render } from 'react-dom';
import SearchParams from './searchParams';
import { Router, Link } from '@reach/router';
import Details from './details';

const App = () => {
    return (
        <div>
            <header>
                <Link to="/">Trying React</Link>
            </header>
            <Router>
                <SearchParams path="/"></SearchParams>
                <Details path="/details/:id"></Details>
            </Router>
        </div>
    );
};

// overwrites what is inside the div
render(<App />, document.getElementById('root'));
