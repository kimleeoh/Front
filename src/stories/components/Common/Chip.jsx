import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";

const Chip = ({ label, active, onClick }) => {
    const { width: windowSize } = useWindowSize();
    return (
        <StyledChip
            active={active}
            onClick={() => onClick(label)}
            maxWidth={windowSize}
        >
            #{label}
        </StyledChip>
    );
};

Chip.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

Chip.defaultProps = {
    active: false,
};

export default Chip;

const StyledChip = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 20px;
    border: 1px solid ${(props) => (props.active ? "#3182F7" : "#ACB2BB")};
    background-color: ${(props) => (props.active ? "#3182F7" : "transparent")};
    color: ${(props) => (props.active ? "white" : "#434B60")};
    font-size: ${(props) => (props.maxWidth < 343 ? "12px" : "15px")};
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        background-color: #3182f7;
        color: white;
    }
`;
