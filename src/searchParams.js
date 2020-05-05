import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';

const SearchParams = () => {
    const [location, setLocation] = useState('Seattle, WA');
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
    const [breed, BreedDropDown, setBreed] = useDropdown('Breed', '', breeds);

    // useEffect runs after rendering is finished, helps to load the page faster
    useEffect(() => {
        setBreeds([]); // clear previous data
        setBreed(''); // clear previous data

        // breeds here is separate from the one outside the function
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreed, setBreeds]);

    return (
        <div className="search-params">
            <h1>{location}</h1>
            <form>
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={(event) => setLocation(event.target.value)}
                    />
                </label>
                <AnimalDropdown></AnimalDropdown>
                <BreedDropDown></BreedDropDown>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default SearchParams;
