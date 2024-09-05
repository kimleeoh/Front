import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Popup = ({ children, title, onClose, position }) => {
    return (
        <PopupWrapper style={{ top: position.top, left: position.left }}>
            <Header>
                <Title>{title}</Title>
                <CloseButton onClick={onClose}>×</CloseButton>
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
    position: absolute; /* 팝업 위치를 동적으로 조정 */
    width: 195px;
    background: #fff;
    box-shadow: 8px 8px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    z-index: 100;
    transition: all 0.3s ease;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`;

const Title = styled.h2`
    color: #ACB2BB;
    font-size: 12px;
    font-weight: 400;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
`;

const Content = styled.div`
    padding: 20px;
`;

export default Popup;
