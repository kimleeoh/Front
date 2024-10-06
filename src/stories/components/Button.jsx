import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useWindowSize from "./Common/WindowSize";

/**
 * Primary UI component for user interaction
 */
const Button = React.forwardRef(
    (
        {
            color,
            backgroundColor,
            hoverColor,
            hoverBackgroundColor,
            fontSize,
            width,
            height,
            label,
            disabled,
            underline,
            ...props
        },
        ref
    ) => {
        const { width: windowSize } = useWindowSize();
        return (
            <StyledButton
                ref={ref}
                color={color}
                backgroundColor={backgroundColor}
                hoverColor={hoverColor}
                hoverBackgroundColor={hoverBackgroundColor}
                fontSize={fontSize}
                width={width}
                height={height}
                disabled={disabled}
                underline={underline}
                {...props}
                maxWidth={windowSize}
            >
                {label}
            </StyledButton>
        );
    }
);

Button.propTypes = {
    /**
     * Text color
     */
    color: PropTypes.string,
    /**
     * Background color
     */
    backgroundColor: PropTypes.string,
    /**
     * Hover text color
     */
    hoverColor: PropTypes.string,
    /**
     * Hover background color
     */
    hoverBackgroundColor: PropTypes.string,
    /**
     * Width of the button
     */
    fontSize: PropTypes.string,
    /**
     * Size of the font
     */
    width: PropTypes.string,
    /**
     * Height of the button
     */
    height: PropTypes.string,
    /**
     * Button contents
     */
    label: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    /**
     * Whether to apply underline to the text
     */
    underline: PropTypes.bool,
};

Button.defaultProps = {
    color: "white",
    backgroundColor: "#3182F7",
    hoverColor: "white",
    hoverBackgroundColor: "#145c9e",
    fontSize: "16px",
    height: "50px",
    disabled: false,
    onClick: undefined,
    underline: false,
};

export default Button;

const StyledButton = styled.button`
    font-family: "Arial", sans-serif;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-size: ${(props) => props.fontSize};
    padding: 11px 20px;
    border: none;
    border-radius: 16px;
    cursor: ${(props) => (props.disabled ? "" : "pointer")};
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor};
    width: ${(props) => (props.width ? props.width : "100%")};
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: ${(props) => props.height};
    transition: all 0.3s ease;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    text-decoration: ${(props) =>
        props.underline ? "underline" : "none"}; /* Underline 적용 */
    &:hover {
        color: ${(props) => (props.disabled ? props.color : props.hoverColor)};
        background-color: ${(props) =>
            props.disabled
                ? props.backgroundColor
                : props.hoverBackgroundColor};
    }
    &:active {
        transition: all 0.3s ease;
        scale: ${(props) => (props.disabled ? 1 : 0.95)};
    }
`;
