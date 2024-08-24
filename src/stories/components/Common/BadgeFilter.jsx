import React, { useState } from 'react';
import styled from 'styled-components';
import Badge from './Badge';
import PropTypes from 'prop-types';

const Container = styled.div`
    height: 40px;
    width: 380px;
    padding: 0 10px;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;

const BadgeFilter = ({ onFilterChange }) => {
    const [activeBadges, setActiveBadges] = useState([]);

    const handleBadgeClick = (label) => {
        const updatedBadges = activeBadges.includes(label)
            ? activeBadges.filter(badge => badge !== label)
            : [...activeBadges, label];

        setActiveBadges(updatedBadges);
        onFilterChange(updatedBadges); // Pass the updated badges to the parent component
    };

    const badges = ['필기공유', '시험정보', '수업꿀팁'];

    return (
        <Container>
            {badges.map(badge => (
                <Badge
                    key={badge}
                    label={badge}
                    active={activeBadges.includes(badge)}
                    onClick={() => handleBadgeClick(badge)}
                />
            ))}
        </Container>
    );
};

BadgeFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default BadgeFilter;
