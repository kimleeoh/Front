import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const dropdownAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10px) translateX(5px) scaleX(0.5) scaleY(0.5);
        transform-origin: right top;
    }
    70% {
        transform: scaleX(1.05) scaleY(1.05);
        transform-origin: right top;
    }
    100% {
        opacity: 1;
        transform: translateY(0) translateX(0) scaleX(1) scaleY(1);
        transform-origin: right top;
    }
`;

const Popup = ({ children, title, onClose, position }) => {
    return (
        <PopupWrapper style={{ top: position.top, left: position.left }}>
            <Header>
                {title}
            </Header>
            <Content>{children}</Content>
        </PopupWrapper>
    );
};

Popup.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    position: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
};

const PopupWrapper = styled.div`
    position: absolute;
    width: 195px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    box-shadow: 6px 6px 8px 0px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    z-index: 100;
    transition: all 0.3s ease;

    animation: ${dropdownAnimation} 0.3s ease;
    transform-origin: right top; /* 팝업이 확장되는 기준점 설정 */
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px 8px 16px;
    
    color: #ACB2BB;
    font-size: 12px;
    font-weight: 400;
`;

const Content = styled.div`
    padding: 0 4px 4px 4px;
`;

export default Popup;
