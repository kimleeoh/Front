import react from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Popup = ({ children, title, onClose }) => {
    return (
        <PopupWrapper>
            <Title>{title}</Title>
        <Content>{children}</Content>
        </PopupWrapper>
    );
    }

Popup.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 195px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: top 16px;
    border-radius: 16px;
    background: #FFF;
    box-shadow: 8px 8px 10px 0px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
`;

const Title = styled.h2`
    color: #ACB2BB;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Content = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 0 0 16px 16px;
`;

export default Popup;