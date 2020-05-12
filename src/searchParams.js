import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './results';
import { connect } from 'react-redux';
import changeTheme from './actionCreators/changeTheme';
import changeLocation from './actionCreators/changeLocation';

const SearchParams = (props) => {
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
    const [breed, BreedDropDown, setBreed] = useDropdown('Breed', '', breeds);
    const [pets, setPets] = useState([]); //empty array because there wont be pets when api is first requested

    async function requestPets() {
        const { animals } = await pet.animals({
            location: props.location,
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
                        value={props.location}
                        placeholder="Location"
                        onChange={(event) => props.setLocation(event.target.value)}
                    />
                </label>
                <AnimalDropdown></AnimalDropdown>
                <BreedDropDown></BreedDropDown>
                <label htmlFor="theme">
                    Theme
                    <select
                        value={props.theme}
                        onChange={(event) => props.setTheme(event.target.value)}
                        onBlur={(event) => props.setTheme(event.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                    </select>
                </label>
                <button style={{ backgroundColor: props.theme }}>Submit</button>
            </form>
            <Results pets={pets}></Results>
        </div>
    );
};

const mapStateToProps = ({ theme, location }) => ({
    theme,
    location,
});

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(changeTheme(theme)),
    setLocation: (location) => dispatch(changeLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
