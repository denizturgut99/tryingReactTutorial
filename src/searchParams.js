import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './results';

const SearchParams = () => {
    const [location, setLocation] = useState('Seattle, WA');
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
    const [breed, BreedDropDown, setBreed] = useDropdown('Breed', '', breeds);
    const [pets, setPets] = useState([]); //empty array because there wont be pets when api is first requested

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
                <button>Submit</button>
            </form>
            <Results pets={pets}></Results>
        </div>
    );
};

export default SearchParams;
