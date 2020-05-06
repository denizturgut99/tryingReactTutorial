import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './results';
import ThemeContext from './themeContext';

const SearchParams = () => {
    const [location, setLocation] = useState('Seattle, WA');
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
    const [breed, BreedDropDown, setBreed] = useDropdown('Breed', '', breeds);
    const [pets, setPets] = useState([]); //empty array because there wont be pets when api is first requested
    const [theme, setTheme] = useContext(ThemeContext);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal,
        });

        setPets(animals || []); // either going to be what is inside animals or empty
    }

    // useEffect runs after rendering is finished, helps to load the page faster
    useEffect(() => {
        setBreeds([]); // clear previous data
        setBreed(''); // clear previous data

        // breeds here is separate from the one outside the function
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        });
    }, [animal, setBreed, setBreeds]);

    return (
        <div className="search-params">
            <h1>{location}</h1>
            <form
                onSubmit={(event) => {
                    event.preventDefault(); // prevent from submitting html post form
                    requestPets();
                }}
            >
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
                <label htmlFor="theme">
                    Theme
                    <select
                        value={theme}
                        onChange={(event) => setTheme(event.target.value)}
                        onBlur={(event) => setTheme(event.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets}></Results>
        </div>
    );
};

export default SearchParams;
