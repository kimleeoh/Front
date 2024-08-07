import React, { useState } from 'react';
import Badge from './Badge';

const BadgeFilter = () => {
    const [activeBadges, setActiveBadges] = useState([]);

    const handleBadgeClick = (label) => {
        setActiveBadges(prevState =>
            prevState.includes(label)
                ? prevState.filter(badge => badge !== label)
                : [...prevState, label]
        );
    };

    const badges = ['필기공유', '시험정보', '수업꿀팁'];

    return (
        <div>
            {badges.map(badge => (
                <Badge
                    key={badge}
                    label={badge}
                    active={activeBadges.includes(badge)}
                    onClick={handleBadgeClick}
                />
            ))}
        </div>
    );
};

export default BadgeFilter;
