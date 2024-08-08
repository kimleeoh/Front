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
    border: 1px solid #ACB2BB;
    background-color: ${props => (props.active ? '#ACB2BB' : 'transparent')};
    color: ${props => (props.active ? 'white' : '#ACB2BB')};
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #ACB2BB;
        color: white;
    }
`;
