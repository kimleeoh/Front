import React, { useState } from 'react';
import styled from 'styled-components';
import Chip from './Chip';
import PropTypes from 'prop-types';
import useWindowSize from './WindowSize';

const Container = styled.div`
    height: 40px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: ${(props) => props.marginTop};
`;

const ChipFilter = ({ onFilterChange, marginTop }) => {
    const [activeChips, setActiveChips] = useState([]);

    const handleChipClick = (label) => {
        const updatedChips = activeChips.includes(label)
            ? activeChips.filter(badge => badge !== label)
            : [...activeChips, label];

        setActiveChips(updatedChips);
        onFilterChange(updatedChips); // Pass the updated badges to the parent component
    };

    const badges = ['필기공유', '시험정보', '수업꿀팁'];

    const {width: windowSize} = useWindowSize();

    return (
        <Container maxWidth={windowSize} marginTop={marginTop}>
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
    marginTop: PropTypes.string,
};

export default ChipFilter;
