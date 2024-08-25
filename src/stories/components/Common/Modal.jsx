import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';

const Modal = forwardRef(({ children, width = '400px', height = '300px' }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }));

    if (!isOpen) return null;

    const handleOverlayClick = () => setIsOpen(false);

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent onClick={handleContentClick} width={width} height={height}>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
});

export default Modal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;
    width: ${props => props.width};
    height: ${props => props.height};

    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
