import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet';

const App = () => {
    // creates component
    /* return React.createElement('div', {}, [
        React.createElement('h1', {}, 'Trying React'),
        React.createElement(Pet, {
            name: 'Luna',
            animal: 'Dog',
            breed: 'Havanese',
        }),
        React.createElement(Pet, {
            name: 'Pepper',
            animal: 'Bird',
            breed: 'Cockatiel',
        }),
        React.createElement(Pet, {
            name: 'Doink',
            animal: 'Cat',
            breed: 'Stray',
        }),
    ]); */

    return (
        <div>
            <h1>Trying React</h1>
            <Pet name="Luna" animal="Dog" breed="Havanese"></Pet>
            <Pet name="Pepper" animal="Bird" breed="Cockatiel"></Pet>
            <Pet name="Doink" animal="Cat" breed="Stray"></Pet>
        </div>
    );
};

// overwrites what is inside the div
render(<App />, document.getElementById('root'));
