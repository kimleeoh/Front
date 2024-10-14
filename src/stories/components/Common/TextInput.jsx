import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "../../components/Common/WindowSize";

const TextInput = ({
    width,
    height,
    placeholder,
    fontColor,
    backgroundColor,
    fontSize,
    marginTop,
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
        <StyledTextInput
            value={content}
            onChange={handleChange}
            placeholder={isfocused ? "" : placeholder}
            width={width}
            height={height}
            fontColor={fontColor}
            backgroundColor={backgroundColor}
            fontSize={fontSize}
            marginTop={marginTop}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxWidth={windowSize}
        />
    );
};

export default TextInput;

const StyledTextInput = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: ${(props) => props.height};
    margin-top: ${(props) => props.marginTop};
    padding: 10px;
    border: none;
    border-bottom: 1px solid #acb2bb;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.fontColor};
    font-size: ${(props) => props.fontSize};
    line-height: 1.5;
    resize: none;
    outline: none;

    &::placeholder {
        color: #434b60;
        font-size: ${(props) => props.fontSize};
    }
`;

TextInput.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    marginTop: PropTypes.string,
    onChange: PropTypes.func,
};

TextInput.defaultProps = {
    width: "100%",
    height: "30px",
    placeholder: "내용을 입력하세요.",
    fontColor: "#434B60",
    backgroundColor: "white",
    fontSize: "18px",
    marginTop: "0px",
};
