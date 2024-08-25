import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Badge = ({ label, active, onClick }) => {
    return (
        <StyledBadge active={active} onClick={() => onClick(label)}>
            #{label}
        </StyledBadge>
    );
};

Badge.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

Badge.defaultProps = {
    active: false,
};

export default Badge;

const StyledBadge = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    border: 1px solid #434B60;
    background-color: ${props => (props.active ? '#434B60' : 'transparent')};
    color: ${props => (props.active ? 'white' : '#434B60')};
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        background-color: #434B60;
        color: white;
    }
`;
