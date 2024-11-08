import React, { useState, useRef, useCallback, useEffect } from "react";
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

const ChipFilter = ({ onFilterChange, marginTop, postOnly, value }) => {
    const [internalActiveChips, setInternalActiveChips] = useState(value || []);
    const isDebouncing = useRef(false);

    const chipFilterMapping = {
        필기공유: "pilgy",
        시험정보: "test",
        수업꿀팁: "honey",
    };

    useEffect(() => {
        if (value !== undefined) {
            setInternalActiveChips(value);
        }
    }, [value]);

    const handleChipClick = useCallback(
        (label) => {
            if (!postOnly) {
                if (isDebouncing.current) return;

                isDebouncing.current = true;
                setTimeout(() => {
                    isDebouncing.current = false;
                }, 1000);
            }

            let updatedChips;

            if (postOnly) {
                updatedChips = internalActiveChips.includes(label)
                    ? []
                    : [label];
            } else {
                updatedChips = internalActiveChips.includes(label)
                    ? internalActiveChips.filter((badge) => badge !== label)
                    : [...internalActiveChips, label];
            }

            if (value === undefined) {
                setInternalActiveChips(updatedChips);
            }

            const activeFilters = postOnly
                ? updatedChips.length > 0
                    ? chipFilterMapping[updatedChips[0]]
                    : ""
                : updatedChips.map((chip) => chipFilterMapping[chip]);

            onFilterChange(activeFilters, updatedChips);
        },
        [internalActiveChips, postOnly, onFilterChange, value]
    );

    const badges = ["필기공유", "시험정보", "수업꿀팁"];
    const { width: windowSize } = useWindowSize();

    const activeChips = value !== undefined ? value : internalActiveChips;

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
    value: PropTypes.arrayOf(PropTypes.string),
};

ChipFilter.defaultProps = {
    postOnly: false,
};

export default ChipFilter;
