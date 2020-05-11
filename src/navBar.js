import React, { useState } from 'react';
import { Link } from '@reach/router';
import { css, keyframes } from '@emotion/core';
import colors from './colors';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Navbar = () => {
    const [padding, setPadding] = useState(15);
    return (
        <header
            onClick={() => setPadding(padding + 15)}
            css={css`
                background-color: ${colors.secondary};
                padding: ${padding}px;
            `}
        >
            <Link to="/">Adopt me!</Link>
            <span
                css={css`
                    font-size: 50px;
                    display: inline-block;
                    animation: 1s ${spin} linear infinite;
                    &:hover {
                        animation: 1s ${spin} linear infinite reverse;
                        text-decoration: underline;
                    }
                `}
                role="img"
                aria-label="logo"
            >
                🐕
            </span>
        </header>
    );
};

export default Navbar;
