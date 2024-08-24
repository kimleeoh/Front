import React, { useState } from 'react';
import Badge from './Badge';
import PropTypes from 'prop-types';

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
        <div style={{height: '40px', marginTop: '15px'}}>
            {badges.map(badge => (
                <Badge
                    key={badge}
                    label={badge}
                    active={activeBadges.includes(badge)}
                    onClick={()=>handleBadgeClick(badge)}
                />
            ))}
        </div>
    );
};

BadgeFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};


export default BadgeFilter;
