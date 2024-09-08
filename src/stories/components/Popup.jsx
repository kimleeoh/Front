import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    position: absolute; /* 팝업 위치를 동적으로 조정 */
    width: 195px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
    box-shadow: 6px 6px 8px 0px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    z-index: 100;
    transition: all 0.3s ease;
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
    padding: 0 8px 8px 8px;
`;

export default Popup;
