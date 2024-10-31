import React, { useState, useEffect } from "react";
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
    value: externalValue,
    name, // 추가: name prop 추가
    isPostPage = false, // 게시물 작성 창인가?
}) => {
    const [content, setContent] = useState(externalValue || "");
    const [isfocused, setisfocused] = useState(false);

    useEffect(() => {
        setContent(externalValue || "");
    }, [externalValue]); // 추가: externalValue가 변경될 때마다 상태 업데이트

    const handleChange = (e) => {
        const newValue = e.target.value;
        setContent(newValue);

        if (onChange) {
            if (isPostPage) {
                onChange(newValue); // Send raw value on post page
            } else {
                onChange({ target: { name, value: newValue } }); // Send as event-like object
            }
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
            name={name} // 추가: name prop 전달
        />
    );
};

TextArea.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string, // 추가: value prop 추가
    name: PropTypes.string, // 추가: name prop 추가
};

TextArea.defaultProps = {
    width: "100%",
    height: "100px",
    placeholder: "내용을 입력하세요.",
    fontColor: "#434B60",
    backgroundColor: "white",
    fontSize: "18px",
    value: "", // 기본값 추가
    name: "", // 기본값 추가
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
