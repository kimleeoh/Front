import React, { useState } from 'react';
import styled from 'styled-components';
import Chip from './Chip';
import PropTypes from 'prop-types';

const Container = styled.div`
    height: 40px;
    width: 380px;
    padding: 0 10px;
    min-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;

const ChipFilter = ({ onFilterChange }) => {
    const [activeChips, setActiveChips] = useState([]);

    const handleChipClick = (label) => {
        const updatedChips = activeChips.includes(label)
            ? activeChips.filter(badge => badge !== label)
            : [...activeChips, label];

        setActiveChips(updatedChips);
        onFilterChange(updatedChips); // Pass the updated badges to the parent component
    };

    const badges = ['필기공유', '시험정보', '수업꿀팁'];

    return (
        <Container>
            {badges.map(badge => (
                <Chip
                    key={badge}
                    label={badge}
                    active={activeChips.includes(badge)}
                    onClick={() => handleChipClick(badge)}
                />
            ))}
        </Container>
    );
};

ChipFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default ChipFilter;
