import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "../../components/Common/WindowSize";

const PointInput = ({
    width,
    height,
    placeholder,
    fontColor,
    backgroundColor,
    fontSize,
    onChange,
    point,
    disabled,
}) => {
    const [content, setContent] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setContent(value);
            if (onChange) {
                onChange(value);
            }
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!content) {
            setIsFocused(false);
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper maxWidth={windowSize}>
            {point !== null ? (
                 <small style={{ marginRight: "auto" }}>보유 포인트: {point}p</small>
            ) : (
                <small style={{ marginRight: "auto" }}>일정한 포인트가 지급됩니다.</small>
            )}

            <StyledPointInput
                value={content}
                onChange={handleChange}
                placeholder={isFocused ? "" : placeholder}
                width={width}
                height={height}
                fontColor={fontColor}
                backgroundColor={backgroundColor}
                fontSize={fontSize}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                maxWidth={windowSize}
            />
        </Wrapper>
    );
};

export default PointInput;

PointInput.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    onChange: PropTypes.func,
    point: PropTypes.number,
    disabled: PropTypes.bool,
};

PointInput.defaultProps = {
    width: "380px",
    height: "50px",
    placeholder: "포인트를 입력하세요. ",
    fontColor: "#434B60",
    backgroundColor: "#F0F2F4",
    fontSize: "16px",
    point: null,
    disabled: false,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin-top: 10px;
`;

const StyledPointInput = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: ${(props) => props.height};
    padding: 10px;
    border: none;
    border-radius: 20px;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.fontColor};
    font-size: ${(props) => props.fontSize};
    line-height: 1.5;
    resize: none;
    outline: none;
    text-indent: 15px;

    &::placeholder {
        color: #434b60;
        font-size: ${(props) => props.fontSize};
    }
`;
