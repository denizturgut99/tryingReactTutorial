import React, { useState, FunctionComponent, Dispatch } from 'react';

const useDropdown = (label: string, defaultState: string, options: string[]) => {
    const [state, setState] = useState(defaultState);
    const id = `use-dropdown-${label.replace(' ', '').toLowerCase()}`;
    const Dropdown: FunctionComponent = () => (
        <label htmlFor={id}>
            {label}
            <select
                id={id}
                value={state}
                onChange={(event) => setState(event.target.value)}
                onBlur={(event) => setState(event.target.value)}
            >
                <option>All</option>
                {options.map((item) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
        </label>
    );
    return [state, Dropdown, setState] as [string, FunctionComponent, Dispatch<string>];
};

export default useDropdown;
