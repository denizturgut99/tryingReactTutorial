import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
    const elRef = useRef(null); // useRef allows you to destroy the modal markup
    if (!elRef.current) {
        const div = document.createElement('div');
        elRef.current = div;
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        modalRoot.appendChild(elRef.current);

        return () => modalRoot.removeChild(elRef.current);
    }, []); // , [] makes it run only once as it has no dependencies

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
