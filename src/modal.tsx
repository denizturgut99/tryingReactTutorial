import React, { useEffect, useRef, FunctionComponent } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal: FunctionComponent = ({ children }) => {
    const elRef = useRef(document.createElement('div')); // useRef allows you to destroy the modal markup

    // componentWillUnmount of hooks
    useEffect(() => {
        if (!modalRoot) {
            return;
        }
        modalRoot.appendChild(elRef.current);
        return () => {
            modalRoot.removeChild(elRef.current);
        };
    }, []); // , [] makes it run only once as it has no dependencies

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
