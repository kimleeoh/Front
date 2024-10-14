import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";

const TextArea = ({
    width,
    height,
    placeholder,
    fontColor,
    backgroundColor,
    fontSize,
    onChange,
}) => {
    const [content, setContent] = useState("");
    const [isfocused, setisfocused] = useState(false);

    const handleChange = (e) => {
        setContent(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleFocus = () => {
        setisfocused(true);
    };

    const handleBlur = () => {
        if (!content) {
            setisfocused(false);
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <StyledTextArea
            value={content}
            onChange={handleChange}
            placeholder={isfocused ? "" : placeholder}
            width={width}
            height={height}
            fontColor={fontColor}
            backgroundColor={backgroundColor}
            fontSize={fontSize}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxWidth={windowSize}
        />
    );
};

export default TextArea;

const StyledTextArea = styled.textarea`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: ${(props) => props.height};
    padding: 5px 10px;
    border: none;
    border-radius: 16px;

    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.fontColor};
    font-size: ${(props) => props.fontSize};
    line-height: 1.5;
    resize: none;
    outline: none;

    overflow-y: auto;
    white-space: pre-wrap;
    word-wrap: break-word;

    &::placeholder {
        color: #acb2bb;
        font-size: ${(props) => props.fontSize};
        white-space: pre-wrap;
    }

    font-family: Arial, sans-serif;
`;

TextArea.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    onChange: PropTypes.func,
};

TextArea.defaultProps = {
    width: "100%",
    height: "100px",
    placeholder: "내용을 입력하세요.",
    fontColor: "#434B60",
    backgroundColor: "white",
    fontSize: "18px",
};
