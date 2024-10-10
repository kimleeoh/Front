import React, { useState } from "react";
import styled from "styled-components";
import Chip from "./Chip";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";

const Container = styled.div`
    height: 40px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: ${(props) => props.marginTop};
`;

const ChipFilter = ({ onFilterChange, marginTop, postOnly }) => {
    const [activeChips, setActiveChips] = useState([]);

    const chipFilterMapping = {
        필기공유: "pilgy",
        시험정보: "test",
        수업꿀팁: "honey",
    };

    const handleChipClick = (label) => {
        let updatedChips;

        if (postOnly) {
            // If postOnly is true, only one chip can be active
            updatedChips = activeChips.includes(label) ? [] : [label];
        } else {
            updatedChips = activeChips.includes(label)
                ? activeChips.filter((badge) => badge !== label)
                : [...activeChips, label];
        }

        setActiveChips(updatedChips);

        // If postOnly is true, return the single chip as a string, otherwise return an array
        const activeFilters = postOnly
            ? updatedChips.length > 0
                ? chipFilterMapping[updatedChips[0]]
                : ""
            : updatedChips.map((chip) => chipFilterMapping[chip]);

        onFilterChange(activeFilters);
    };

    const badges = ["필기공유", "시험정보", "수업꿀팁"];
    const { width: windowSize } = useWindowSize();

    return (
        <Container maxWidth={windowSize} marginTop={marginTop}>
            {badges.map((badge) => (
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
    postOnly: PropTypes.bool,
};
ChipFilter.defaultProps = {
    postOnly: false,
};

export default ChipFilter;
